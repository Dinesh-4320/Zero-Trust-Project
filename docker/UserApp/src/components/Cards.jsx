// import Card from "./Card";
// // import { useQuery } from "@apollo/client";
// // import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query";
// // import { GET_AUTHENTICATED_USER, GET_USER_AND_TRANSACTIONS } from "../graphql/queries/user.query";

// const Cards = () => {
// 	// const { data, loading, error } = useQuery(GET_TRANSACTIONS);
// 	// const {data:authuser} = useQuery(GET_AUTHENTICATED_USER);
// 	// const { data:userAndTransactions } = useQuery(GET_USER_AND_TRANSACTIONS, {
// 	// 	variables: { userId: authuser?.authUser._id },

// 	// });
// 	// console.log(userAndTransactions);

// 	const data = {
// 		transactions: [
// 			{
// 				_id: "1",
// 				description: "Rent",
// 				paymentType: "Credit Card",
// 				category: "Expense",
// 				amount: 1000,
// 				location: "Mumbai",
// 				date: "2021-09-01",
// 			},
// 			{
// 				_id: "2",
// 				description: "Salary",
// 				paymentType: "Bank",
// 				category: "Saving",
// 				amount: 2000,
// 				location: "Mumbai",
// 				date: "2021-09-01",
// 			},
// 			{
// 				_id: "3",
// 				description: "Groceries",
// 				paymentType: "Cash",
// 				category: "Expense",
// 				amount: 500,
// 				location: "Mumbai",
// 				date: "2021-09-01",
// 			},
// 		],
// 	};
// 	const loading = false;
// 	const authuser = {
// 		authUser: {
// 			_id: "1",
// 			name: "John Doe",
// 			email: "john@mail.com"
// 		},
// 	};
// 	return (
// 		<div className='w-full px-10 min-h-[40vh]'>
// 			<p className='text-5xl font-bold text-center my-10'>History</p>
// 			<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20'>
// 				{!loading && data.transactions.map((transaction) => (
// 					<Card key={transaction._id} transaction={transaction} authUser={authuser.authUser} />
// 				))}
// 			</div>
// 			{!loading && data.transactions.length === 0 && (
// 				<p className='text-3xl text-center'>No transaction history found</p>
// 			)}
// 		</div>
// 	);
// };
// export default Cards;

import Card from "./Card";
import { useSelector } from "react-redux";

const Cards = () => {
  const { transactions, user, loading } = useSelector((state) => state.user);
  const userDetails = useSelector((state) => state.user.userDetails);

  const hasTransactions = transactions && Object.keys(transactions).length > 0;
  const transactionList = hasTransactions
    ? Object.entries(transactions).map(([id, transaction]) => ({
        _id: id,
        ...transaction,
      }))
    : [];

  return (
    <div className="w-full px-10 min-h-[40vh]">
      <p className="text-5xl font-bold text-center my-10">History</p>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20">
        {!loading && hasTransactions ? (
          transactionList.map((transaction) => (
            <Card
              key={transaction._id}
              transaction={transaction}
              authUser={user}
              userDetails={userDetails}
            />
          ))
        ) : (
          <p className="text-3xl text-center">
            {loading
              ? "Loading transactions..."
              : "No transaction history found"}
          </p>
        )}
      </div>
    </div>
  );
};

export default Cards;
