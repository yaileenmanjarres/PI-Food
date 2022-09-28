import './footer.css';

function Footer() {
  return (
    <div className='footer-container'>
      <footer className='footer'>
      <div className="footer-copy">&#169; Yaileen Manjarrés.</div>
        <span id='apps'>
          <a href="https://github.com/yaileenmanjarres">
            <i className="fab fa-github logo-app" />
          </a>
          <a href="https://www.linkedin.com/in/yaileen-manjarres-671b01238">
            <i className="fab fa-linkedin logo-app" />
          </a>
        </span>
      </footer>
    </div>
  )
}

export default Footer;
