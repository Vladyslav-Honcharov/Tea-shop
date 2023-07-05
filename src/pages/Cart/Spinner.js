import { FaShoppingCart } from "react-icons/fa";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

const Spinner = () => {
  const override = css`
    display: block;
    margin: 0 auto;
    text-align: center;
    padding: 50px;
  `;

  return (
    <div css={override}>
      <ClipLoader size={35} color={"#123abc"} loading={true} />
      <div style={{ marginTop: "10px" }}>Buying processing...</div>
      <div style={{ marginTop: "10px" }}>
        <FaShoppingCart size={20} />
      </div>
    </div>
  );
};

export default Spinner;
