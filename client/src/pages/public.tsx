import {Link} from "react-router-dom";
import {
  FaArrowRight,
  FaBriefcase,
  FaHandPaper,
  FaMoneyCheck,
  FaQuestion,
  FaStar,
  FaUser,
  FaUserAlt,
} from "react-icons/fa";
import {MdRefresh} from "react-icons/md";

import {AuthFooter, PublicHeader} from "../components";
import {usePrimaryColor} from "../components/primary-provider";
import {useTitle} from "../hooks";

const Public = () => {
  useTitle("Public");

  const {primaryColor} = usePrimaryColor();

  return (
    <>
      <PublicHeader />
      <div className="container px-10 mx-auto mt-5 flex items-center justify-center flex-col lg:flex-row">
        <div className="mb-5 lg:mb-0">
          <h1 className="text-5xl capitalize my-5 font-bold">
            yes no prediction making website
          </h1>
          <p className="my-5 text-lg capitalize leading-6">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit
            laudantium natus quos nisi? Optio corrupti, dolorum amet atque
            expedita voluptate.
          </p>
          <button
            className={`w-fit bg-${primaryColor}-700 text-white px-4 py-2 rounded-md hover:bg-${primaryColor}-800 transition-colors capitalize mb-5 flex gap-3 items-center`}
          >
            get started <FaArrowRight />
          </button>
        </div>
        <div className="h-full w-full flex items-center justify-center lg:h-[500px] lg:ml-5">
          <img
            src="hero.jpg"
            alt="hero"
            className="w-full rounded-3xl mx-auto lg:h-full lg:w-full"
          />
        </div>
      </div>
      <section className="container px-10 mx-auto my-10">
        <h2 className="text-5xl capitalize my-5 font-bold text-center">
          our all time achievement
        </h2>
        <p className="my-5 text-lg capitalize leading-6 text-center">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione quos
          doloremque temporibus obcaecati vero. Eveniet exercitationem odit
          debitis natus nihil.
        </p>
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex-auto w-1/4 mx-2 p-4 shadow-md rounded-xl text-center dark:shadow-white">
            <h3
              className={`mb-4 text-3xl font-bold capitalize text-${primaryColor}-500`}
            >
              20+
            </h3>
            <h4 className="text-xl font-medium capitalize">
              daily new questions
            </h4>
          </div>
          <div className="flex-auto w-1/4 mx-2 p-4 shadow-md rounded-xl text-center dark:shadow-white">
            <h3
              className={`mb-4 text-3xl font-bold capitalize text-${primaryColor}-500`}
            >
              200+
            </h3>
            <h4 className="text-xl font-medium capitalize">daily new users</h4>
          </div>
          <div className="flex-auto w-1/4 mx-2 p-4 shadow-md rounded-xl text-center dark:shadow-white">
            <h3
              className={`mb-4 text-3xl font-bold capitalize text-${primaryColor}-500`}
            >
              200000+
            </h3>
            <h4 className="text-xl font-medium capitalize">total users</h4>
          </div>
        </div>
      </section>
      <section className="container px-10 mx-auto mt-5 flex items-center justify-center flex-col lg:flex-row">
        <div className="mb-5 lg:mb-0 w-full lg:w-1/2">
          <h2 className="text-5xl capitalize my-5 font-bold">about us</h2>
          <p className="my-5 text-lg capitalize leading-6">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil sit
            aliquam cupiditate saepe magnam a. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Reprehenderit, quisquam in totam ab
            corrupti cupiditate laudantium recusandae dolore officia natus.
          </p>
          <button
            className={`w-fit bg-${primaryColor}-700 text-white px-4 py-2 rounded-md hover:bg-${primaryColor}-800 transition-colors capitalize mb-5`}
          >
            About Us
          </button>
        </div>
        <div className="h-full flex items-center justify-center lg:h-[500px] lg:ml-5 w-full lg:w-1/2">
          <img
            src="about.jpg"
            alt="about"
            className="w-full rounded-3xl mx-auto lg:h-full lg:w-full"
          />
        </div>
      </section>
      <section className="container px-10 mx-auto mt-10">
        <h2 className="text-5xl capitalize my-5 font-bold text-center">
          our services
        </h2>
        <p className="my-5 text-lg capitalize leading-6 text-center">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis
          odit ipsa minima dignissimos maiores quia dicta explicabo recusandae
          ab, praesentium cupiditate corporis aut pariatur tenetur expedita
          asperiores adipisci quaerat magni.
        </p>
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex-auto w-2/5 lg:w-1/5 mr-5 mb-5 shadow-md dark:shadow-white rounded-xl p-5">
            <FaBriefcase size={36} />
            <h3 className="text-xl font-bold capitalize my-3">Lorem ipsum</h3>
            <p className="text-sm font-medium leading-6 mb-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo,
              modi perspiciatis? At laudantium saepe voluptatibus.
            </p>
            <Link
              to="#"
              className="font-bold text-blue-600 hover:text-blue-800 capitalize"
            >
              read more
            </Link>
          </div>
          <div className="flex-auto w-2/5 lg:w-1/5 mr-5 mb-5 shadow-md dark:shadow-white rounded-xl p-5">
            <FaUser size={36} />
            <h3 className="text-xl font-bold capitalize my-3">Lorem ipsum</h3>
            <p className="text-sm font-medium leading-6 mb-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo,
              modi perspiciatis? At laudantium saepe voluptatibus.
            </p>
            <Link
              to="#"
              className="font-bold text-blue-600 hover:text-blue-800 capitalize"
            >
              read more
            </Link>
          </div>
          <div className="flex-auto w-2/5 lg:w-1/5 mr-5 mb-5 shadow-md dark:shadow-white rounded-xl p-5">
            <FaQuestion size={36} />
            <h3 className="text-xl font-bold capitalize my-3">Lorem ipsum</h3>
            <p className="text-sm font-medium leading-6 mb-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo,
              modi perspiciatis? At laudantium saepe voluptatibus.
            </p>
            <Link
              to="#"
              className="font-bold text-blue-600 hover:text-blue-800 capitalize"
            >
              read more
            </Link>
          </div>
          <div className="flex-auto w-2/5 lg:w-1/5 mr-5 mb-5 shadow-md dark:shadow-white rounded-xl p-5">
            <FaHandPaper size={36} />
            <h3 className="text-xl font-bold capitalize my-3">Lorem ipsum</h3>
            <p className="text-sm font-medium leading-6 mb-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo,
              modi perspiciatis? At laudantium saepe voluptatibus.
            </p>
            <Link
              to="#"
              className="font-bold text-blue-600 hover:text-blue-800 capitalize"
            >
              read more
            </Link>
          </div>
        </div>
      </section>
      <section className="container px-10 mx-auto mt-5 flex items-center justify-center flex-col lg:flex-row">
        <div className="mb-5 lg:mb-0 w-full lg:w-1/2 p-5">
          <h2 className="text-4xl font-bold capitalize mb-4">our features</h2>
          <p className="text-xl capitalize mb-4 leading-6 text-slate-700 dark:text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
            sint error quaerat eligendi tempora incidunt consectetur sit
            quibusdam beatae cupiditate.
          </p>
          <div className="mb-3">
            <div className="mb-3 flex items-center">
              <FaMoneyCheck size={36} />
              <p className="text-xl font-bold capitalize ml-4 text-slate-700 dark:text-white">
                easy payment method
              </p>
            </div>
            <p className="text-sm font-medium leading-6 mb-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit perferendis voluptas dolor dolore hic, voluptatem
              quae! Natus quibusdam voluptas amet.
            </p>
          </div>
          <div className="mb-3">
            <div className="mb-3 flex items-center">
              <FaUserAlt size={36} />
              <p className="text-xl font-bold capitalize ml-4 text-slate-700 dark:text-white">
                user friendly interface
              </p>
            </div>
            <p className="text-sm font-medium leading-6 mb-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit perferendis voluptas dolor dolore hic, voluptatem
              quae! Natus quibusdam voluptas amet.
            </p>
          </div>
          <div className="mb-3">
            <div className="mb-3 flex items-center">
              <MdRefresh size={36} />
              <p className="text-xl font-bold capitalize ml-4 text-slate-700 dark:text-white">
                daily new questions
              </p>
            </div>
            <p className="text-sm font-medium leading-6 mb-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit perferendis voluptas dolor dolore hic, voluptatem
              quae! Natus quibusdam voluptas amet.
            </p>
          </div>
        </div>
        <div className="h-full flex items-center justify-center lg:h-[500px] lg:ml-5 w-full lg:w-1/2">
          <img
            src="/feature.jpg"
            alt="feature"
            className="w-full rounded-3xl mx-auto lg:h-full lg:w-full"
          />
        </div>
      </section>
      <section className="container px-10 mx-auto mt-10">
        <h2 className="text-5xl capitalize my-5 font-bold text-center">
          our testimonial
        </h2>
        <p className="my-5 text-lg capitalize leading-6 text-center">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil sit
          aliquam cupiditate saepe magnam a. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Reprehenderit, quisquam in totam ab
          corrupti cupiditate laudantium recusandae dolore officia natus.
        </p>
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex-auto w-full md:w-5/12 md:mr-5 mb-5 shadow-md dark:shadow-white rounded-xl">
            <img
              src="/testimonial-1.png"
              alt="testimonial"
              className="h-64 w-full rounded-xl"
            />
            <div className="p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-medium capitalize mb-3">
                  John Doe
                </h3>
                <div className="text-amber-500 flex items-center">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
              </div>
              <p className="text-sm font-light leading-6 mb-3 lg:font-medium">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus
                eos vel eius tempore itaque omnis totam, maiores ipsum quos
                commodi est. Reprehenderit eaque voluptatem, magnam amet
                mollitia voluptates architecto libero.
              </p>
            </div>
          </div>
          <div className="flex-auto w-full md:w-5/12 md:mr-5 mb-5 shadow-md dark:shadow-white rounded-xl">
            <img
              src="/testimonial-2.jpg"
              alt="testimonial"
              className="h-64 w-full rounded-xl"
            />
            <div className="p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-medium capitalize mb-3">
                  Jane Dae
                </h3>
                <div className="text-amber-500 flex items-center">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
              </div>
              <p className="text-sm font-light leading-6 mb-3 lg:font-medium">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus
                eos vel eius tempore itaque omnis totam, maiores ipsum quos
                commodi est. Reprehenderit eaque voluptatem, magnam amet
                mollitia voluptates architecto libero.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="container px-10 mx-auto my-5 flex items-center justify-center flex-col lg:flex-row">
        <div className="mb-5 lg:mb-0 w-full lg:w-1/2">
          <h2 className="text-5xl capitalize my-5 font-bold">contact us</h2>
          <p className="my-5 text-lg capitalize leading-6">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil sit
            aliquam cupiditate saepe magnam a. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Reprehenderit, quisquam in totam ab
            corrupti cupiditate laudantium recusandae dolore officia natus.
          </p>
          <div className="mb-5 lg:mb-0">
            <form action="#" className="shadow-xl rounded-2xl p-5">
              <div>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="enter your name"
                  className="w-full p-2 mb-3 rounded-lg text-black placeholder:text-slate-800 placeholder:capitalize outline-0 border border-blue-500 focus:ring-4 focus:ring-blue-200 dark:text-white dark:placeholder:text-white"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="enter your email"
                  className="w-full p-2 mb-3 rounded-lg text-black placeholder:text-slate-800 placeholder:capitalize outline-0 border border-blue-500 focus:ring-4 focus:ring-blue-200 dark:text-white dark:placeholder:text-white"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  id="message"
                  placeholder="enter your message"
                  className="w-full p-2 mb-3 rounded-lg text-black placeholder:text-slate-800 placeholder:capitalize outline-0 border border-blue-500 focus:ring-4 focus:ring-blue-200 dark:text-white dark:placeholder:text-white"
                ></textarea>
              </div>
              <button
                className={`w-fit bg-${primaryColor}-700 text-white px-4 py-2 rounded-md hover:bg-${primaryColor}-800 transition-colors capitalize mb-5`}
              >
                Send
              </button>
            </form>
          </div>
        </div>
        <div className="h-full flex items-center justify-center lg:h-[500px] lg:ml-5 w-full lg:w-1/2">
          <img
            src="contact.jpg"
            alt="about"
            className="w-full rounded-3xl mx-auto lg:h-full lg:w-full"
          />
        </div>
      </section>
      <AuthFooter />
    </>
  );
};

export default Public;
