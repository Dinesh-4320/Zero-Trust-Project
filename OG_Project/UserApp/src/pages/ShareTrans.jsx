import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuditors,
  shareTransaction,
  fetchUserSharedTransactions,
} from "../reducers/userSlice";
import AuditorCard from "../components/AuditorCard";
import { toast } from "react-hot-toast";
import NavBar from "../components/NavBar";

const ShareTrans = () => {
  const dispatch = useDispatch();
  const auditors = useSelector((state) => state.user.auditors);
  const loading = useSelector((state) => state.user.loading);
  const transactionId = useSelector((state) => state.user.transactionId);
  const sharedWith = useSelector((state) => state.user.sharedWith);
  console.log(transactionId);

  useEffect(() => {
    dispatch(getAuditors());
    dispatch(fetchUserSharedTransactions()); // Fetch shared transactions on load
  }, [dispatch]);

  const handleShareTransaction = async (auditorId) => {
    if (!transactionId) {
      toast.error("No transactions available to share.");
      return;
    }

    try {
      await dispatch(shareTransaction({ auditorId, transactionId })).unwrap();
      toast.success("Transaction shared successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to share transaction. Please try again.");
    }
  };

  const isAuditorShared = (auditorId) => {
    return sharedWith.includes(auditorId);
  };

  return (
    <>
      <NavBar />
      <div className="h-screen py-4 px-7">
        <h2 className="text-white text-center text-2xl mb-4">
           Share Transactions with Auditors
        </h2>
        {loading ? (
          <p className="text-white">Loading auditors...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {auditors.map((auditor) => (
              <AuditorCard
                key={auditor._id}
                auditor={auditor}
                onShare={() => handleShareTransaction(auditor._id)}
                isShared={isAuditorShared(auditor._id)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ShareTrans;
