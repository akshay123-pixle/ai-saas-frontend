import React, { useState, useEffect } from "react";
import { subScriptionplans } from "../assets/assets.js";
import { MdDone } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { fetchPaymentLink } from "../store/payment.js";

const Subscription = () => {
  const dispatch = useDispatch();
  const userId = useSelector((store) => store.app.userInfo?.id);
  const paymentLink = useSelector((store) => store.payment.paymentLink);
  const userPlan = useSelector((store) => store.app.userInfo?.plan);

  // Local state to control redirect only after user clicks subscribe
  const [shouldRedirect, setShouldRedirect] = useState(false);

  // When paymentLink updates AND user clicked subscribe, redirect user
  useEffect(() => {
    if (paymentLink) {
      window.location.href = paymentLink; // Redirect to payment URL
    }
  }, [paymentLink, shouldRedirect]);

  const handleSubscribe = () => {
    if (userId) {
      setShouldRedirect(true); // Allow redirect after paymentLink received
      dispatch(fetchPaymentLink({ userId }));
    } else {
      alert("Please login to subscribe");
    }
  };

  return (
    <div className="w-full mt-25 ">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-medium">Choose Your Plan</h1>
        <p className="font-normal text-center">
          Start for free and scale up as you grow. Find the perfect plan for
          your content creation needs.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 bg-white mt-10">
        {subScriptionplans?.map((item, index) => (
          <div
            key={index}
            className="border w-1/4 rounded-3xl border-gray-300 shadow-xl space-y-2"
          >
            <div className="bg-gray-200 rounded-tl-2xl rounded-tr-2xl p-4 space-y-2">
              <h2 className="font-bold">{item.plan}</h2>
              <h3 className="font-bold">${item.price}</h3>
              <p className="font-normal">{item.promp}</p>
            </div>
            <ul className="h-60 p-4 space-y-3 list-item">
              {item?.message?.map((msg, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span>
                    <MdDone className="text-gray-500" />
                  </span>{" "}
                  {msg}
                </li>
              ))}
            </ul>

            {userPlan === "Premium" && item.plan === "Premium" ? (
              <div className="cursor-pointer mb-2 text-center text-white bg-green-400 mx-8 py-1.5 rounded-2xl">
                Active
              </div>
            ) : (
              <div
                onClick={handleSubscribe}
                className="cursor-pointer mb-2 text-center text-white bg-black mx-8 py-1.5 rounded-2xl"
              >
                Subscribe
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscription;
