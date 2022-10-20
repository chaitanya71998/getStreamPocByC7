import * as linkify from "linkifyjs"
import linkifyMention from "linkifyjs/plugins/mention" // eslint-disable-line

// 'linkifyjs/plugins/hashtag';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function linkifyHashtag(linkify) {
  const TT = linkify.scanner.TOKENS // Text tokens
  const MultiToken = linkify.parser.TOKENS.Base // Base Multi token class
  const S_START = linkify.parser.start
  function HASHTAG(value) {
    // @ts-expect-error
    this.v = value
  }
  linkify.inherits(MultiToken, HASHTAG, { type: "hashtag", isLink: true })
  const S_HASH = S_START.jump(TT.POUND)
  const S_HASHTAG = new linkify.parser.State(HASHTAG)

  S_HASH.on(TT.DOMAIN, S_HASHTAG)
  S_HASH.on(TT.UNDERSCORE, S_HASHTAG)
  S_HASH.on(TT.TLD, S_HASHTAG)

  // following lines are the diff from original implemention
  // add support for _ in hashtags
  S_HASH.on(TT.LOCALHOST, S_HASHTAG)
  S_HASHTAG.on(TT.UNDERSCORE, S_HASH)
}

linkifyMention(linkify)
linkifyHashtag(linkify)
export const renderWord = (word, setHashTagsAndMentions) => {
  const [link] = linkify.find(word)
  if (!link) return word

  const { type, value, href } = link

  if (type === "mention") {
    setHashTagsAndMentions({ mentions: word.substr(1) })
  }

  if (type === "hashtag") {
    setHashTagsAndMentions({ hashTags: word.substr(1) })
  }
}

export const getHashTagsAndMentionsFeeds = (activity) => {
  let hashTags = []
  let mentions = []
  // const setHashTagsAndMentions = ({ hashTags, mentions }) => {
  //   console.log(hashTags, mentions, "hashTags, mentions")
  //   hashTags && hashTags.push(hashTags)
  //   mentions && mentions.push(mentions)
  // }
  const renderWord = (word) => {
    const [link] = linkify.find(word)
    if (!link) return word

    const { type, value, href } = link

    if (type === "mention") {
      mentions.push(value.substr(1))
    }

    if (type === "hashtag") {
      hashTags.push(value.substr(1))
    }
  }
  activity.object
    .split(/\r\n|\r|\n/) // first break on line
    .map((line, i) =>
      line
        .split(" ") // break for each word
        .map((word, j) => {
          renderWord(word)
        })
    )
  return { hashTags: hashTags, mentions: mentions }
}

export const getActivitiesToBeUpdatedList = (
  activity,
  hashTagGroup = "hashtags",
  timeline = "mentions"
) => {
  let a = getHashTagsAndMentionsFeeds(activity)
  let toField = []
  a.hashTags.length &&
    a.hashTags.map((tag) => {
      toField.push(`${hashTagGroup}:${tag}`)
    })
  a.mentions.length &&
    a.mentions.map((user) => {
      toField.push(`${timeline}:${user}`)
    })
  return toField
}
