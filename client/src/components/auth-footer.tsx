import {
  FaFacebook,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaDiscord,
  FaHome,
  FaEnvelope,
  FaPhone,
  FaFax,
} from "react-icons/fa";
import {Link} from "react-router-dom";

import {usePrimaryColor} from "./primary-provider";

const AuthFooter = () => {
  const {primaryColor} = usePrimaryColor();

  return (
    <>
      <footer
        className={`bg-${primaryColor}-700 text-center text-white lg:text-left`}
      >
        <div className="flex items-center justify-center border-b-2 border-white p-6 lg:justify-between">
          <div className="mr-12 hidden lg:block">
            <span>Get connected with us on social networks : </span>
          </div>
          <div className="flex justify-center">
            <a href="#!" className="mr-6 text-white">
              <FaFacebook size={24} />
            </a>
            <a href="#!" className="mr-6 text-white">
              <FaTwitter size={24} />
            </a>
            <a href="#!" className="mr-6 text-white">
              <FaLinkedinIn size={24} />
            </a>
            <a href="#!" className="mr-6 text-white">
              <FaInstagram size={24} />
            </a>
            <a href="#!" className="mr-6 text-white">
              <FaYoutube size={24} />
            </a>
            <a href="#!" className="text-white">
              <FaDiscord size={24} />
            </a>
          </div>
        </div>
        <div className="mx-6 py-10 text-center md:text-left">
          <div className="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="">
              <h6 className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
                Yes No
              </h6>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit,
                nulla, voluptas voluptate quisquam incidunt itaque repellendus
                explicabo doloremque cumque ipsa sed commodi porro ea earum.
              </p>
            </div>
            <div className="">
              <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
                Important Links
              </h6>
              <p className="mb-4">
                <Link to="/welcome" className="text-white">
                  Products
                </Link>
              </p>
              <p className="mb-4">
                <Link to="/orders" className="text-white">
                  Orders
                </Link>
              </p>
              <p className="mb-4">
                <Link to="/register" className="text-white">
                  Register
                </Link>
              </p>
              <p className="mb-4">
                <Link to="/register" className="text-white">
                  Login
                </Link>
              </p>
            </div>
            <div className="">
              <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
                Useful links
              </h6>
              <p className="mb-4">
                <Link to="#" className="text-white">
                  Help
                </Link>
              </p>
              <p className="mb-4">
                <Link to="#" className="text-white">
                  Service
                </Link>
              </p>
              <p className="mb-4">
                <Link to="#" className="text-white">
                  Contact
                </Link>
              </p>
              <p>
                <Link to="#" className="text-white">
                  Customer Service
                </Link>
              </p>
            </div>
            <div>
              <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
                Contact
              </h6>
              <p className="mb-4 flex items-center justify-center md:justify-start">
                <FaHome className="mr-3" size={20} />
                Abc Road, Kolkata, India
              </p>
              <p className="mb-4 flex items-center justify-center md:justify-start">
                <FaEnvelope className="mr-3" size={20} />
                test@example.com
              </p>
              <p className="mb-4 flex items-center justify-center md:justify-start">
                <FaPhone className="mr-3" size={20} />+ 91 9999999999
              </p>
              <p className="flex items-center justify-center md:justify-start">
                <FaFax className="mr-3" size={20} />+ 91 9999999999
              </p>
            </div>
          </div>
        </div>
        <div className={`bg-${primaryColor}-700 p-6 text-center`}>
          <span>© 2025 Copyright:</span>
          <a className="font-semibold text-white ml-2" href="#">
            Yes No
          </a>
        </div>
      </footer>
    </>
  );
};

export default AuthFooter;
