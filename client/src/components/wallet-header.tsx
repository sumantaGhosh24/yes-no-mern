import {useSelector} from "react-redux";
import {FaWallet} from "react-icons/fa";

import {selectCurrentToken} from "../app/features/auth/authSlice";
import {usePrimaryColor} from "./primary-provider";
import {formatterINR} from "../lib/utils";

const WalletHeader = () => {
  const {primaryColor} = usePrimaryColor();

  const {user} = useSelector(selectCurrentToken);

  return (
    <header className="container mx-auto flex justify-between items-center bg-white dark:bg-black rounded shadow-lg p-8 my-5 dark:shadow-white">
      <div className="flex items-center space-x-2">
        <FaWallet className={`text-${primaryColor}-500`} size={24} />
        <h1 className="text-2xl font-bold">My Wallet</h1>
      </div>
      <h3 className="text-2xl font-bold">
        {formatterINR.format(user?.amount)}
      </h3>
    </header>
  );
};

export default WalletHeader;
