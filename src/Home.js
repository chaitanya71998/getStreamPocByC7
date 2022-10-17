import React from 'react'
import { Link } from 'react-router-dom'

class Home extends React.Component {
    render() {
        return (
            <>
                <Link to={'/chaitanya'} exact={true} >Chaitanya</Link>
                <br />
                <Link to={'/issac'} exact={true} >Issac</Link>
            </>
        )
    }
}

export default Home