import { useState } from "react";
import { Button } from "../ui/button";
import useProfile from "../useProfile";

const UserForm = ({ user, onSave }) => {
  const [userName, setUserName] = useState(user?.name || "");
  const [admin, setAdmin] = useState(user?.admin || false);
  const [loading, setLoading] = useState(false);
  const { data: loggedInUserData } = useProfile();

  return (
    <div className={`grid grid-cols-1 gap-6`}>
      <form
        className="md:col-span-2"
        onSubmit={(ev) =>
          onSave(ev, {
            name: userName,
            admin,
          })
        }
      >
        <div className="flex flex-col mb-2">
          <label className="">First and Last name</label>
          <input
            type="text"
            id=""
            name=""
            placeholder="First and Last name"
            value={userName}
            onChange={(ev) => setUserName(ev.target.value)}
            className="border p-2 rounded-md"
          />
        </div>
        <div className="flex flex-col mb-2">
          <label className="">Email</label>
          <input
            type="email"
            id=""
            name=""
            disabled={true}
            value={user?.email}
            className="border p-2 rounded-md text-gray-300"
          />
        </div>
        {loggedInUserData.admin && (
          <div>
            <label
              className="p-2 inline-flex items-center gap-2 mb-2"
              htmlFor="adminCb"
            >
              <input
                id="adminCb"
                name=""
                type="checkbox"
                className=""
                value={"1"}
                checked={admin}
                onChange={(ev) => setAdmin(ev.target.checked)}
              />
              <span className="">Admin</span>
            </label>
          </div>
        )}

        <Button type="submit" className="w-full">
          Save
        </Button>
      </form>
    </div>
  );
};

export default UserForm;
