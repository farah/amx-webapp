import React, { Component } from 'react'
import './footer.scss';

export default class Footer extends Component {
  render() {
    return (
  <React.Fragment>

<footer className="globalFooter withCards">

   <article className="globalFooterNav globalFooterNav--collapsed">
    <div className="container-lg">

        <ul className="metaNav">

            <li className="select country">
                <a className="rootLink item-country">
                    <svg width="13" height="13">
                        <path d="M1.543,7L6,7,5.979,11.462a0.536,0.536,0,0,0,1.016.24l4.941-9.931a0.537,0.537,0,0,0-.72-0.721L1.3,5.985A0.537,0.537,0,0,0,1.543,7Z"></path>
                    </svg>
                    Australia</a>

            </li>

            <li className="space"></li>
            <li className="copyright">© Amal Express</li>
        </ul>

    </div>
</article>
</footer>
</React.Fragment>
    )
  }
}