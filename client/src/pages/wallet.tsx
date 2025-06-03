import {useTitle} from "../hooks";
import {Deposit, Transactions, WalletHeader, Withdraw} from "../components";

const Wallet = () => {
  useTitle("Wallet");

  return (
    <>
      <WalletHeader />
      <Deposit />
      <Withdraw />
      <Transactions />
    </>
  );
};

export default Wallet;
