import UserInput from "@/components/user-input";
import UserName from "@/components/username";
import clientPromise from "@/lib/mongodb";
import React from "react";

async function Home() {
  const client = clientPromise;

  const collection = (await client).db("sample").collection("sample");
  const data = await collection.find().toArray();

  console.log(data);

  const formattedData = data.map((item) => ({
    ...item,
    _id: item._id.toString(),
    username: item.username,
    createdAt: item.createdAt,
  }));

  console.log(formattedData);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-orange-200 p-3">
      <UserInput />

      {formattedData.map((item) => (
        <UserName key={item._id} item={item} />
      ))}
    </div>
  );
}

export default Home;
