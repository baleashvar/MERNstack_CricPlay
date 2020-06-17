import React from 'react';
import '../style/Footer.css';

function Footer(props) {
    return(
        <div className="footer">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-6 center-block text-center">
                        Made using the MERN stack. <i className="fa fa-heart" />
                    </div>
                    <div className="col-12 col-sm-6 center-block text-center">
                        <a className="btn btn-social-icon btn-linkedin" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/abhishek-srivastav-b55438199/"><i className="fa fa-linkedin"></i></a>
                        <a className="btn btn-social-icon btn-github" target="_blank" rel="noopener noreferrer" href="https://github.com/AbhiSri7"><i className="fa fa-github"></i></a>
                        <a className="btn btn-social-icon btn-google" href="mailto:abhisrivastav551@gmail.com"><i className="fa fa-google"></i></a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;