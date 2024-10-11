import React from "react";
import ProfileDetails from "./ProfileDetails";

async function getUserData(params) {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user/${params.id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export const metadata = {
  title: "Profile | MarsFlixBD",
  openGraph: {
    title: "Profile | MarsFlixBD",
    description: 'Anime, Movie, Series huge collection see in MarsFlixBD website.',
  },
}

const UserProfile = async ({ params }) => {
  const profile = await getUserData(params);
  console.log("Profile", profile);
  return (
    <div>
      <ProfileDetails profile={profile} params={params} />
    </div>
  );
};

export default UserProfile;