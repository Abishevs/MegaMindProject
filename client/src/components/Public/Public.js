import { Link } from 'react-router-dom'

import React from 'react'

function Public() {

    const content = (
        <section>
            <header>
                <h1>HEllo there, my first full stack MERN app!</h1>
            </header>
            <main>
                <p> Am just working on this. This page simulates 
                    a public page. Followed by and private route.
                </p>
                <Link to="/login">Login</Link>
            </main>
        </section>
    )
  return content
}

export default Public