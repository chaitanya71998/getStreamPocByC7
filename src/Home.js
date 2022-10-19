import React from 'react'
import { Link } from 'react-router-dom'

class Home extends React.Component {
    render() {
        return (
            <>
                <Link to={'/chaitanya'} exact={true} >Chaitanya</Link>
                <br />
                <Link to={'/issac'} exact={true} >Issac</Link>
                <br />
                <Link to={'/eric'} exact={true} >eric</Link>
            </>
        )
    }
}

export default Home