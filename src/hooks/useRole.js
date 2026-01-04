import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const useRole = () => {
    const { user, loading } = useContext(AuthContext);

    const { data: role, isLoading: isRoleLoading } = useQuery({
        // The query runs only when the auth loading is finished and a user exists
        queryKey: [user?.email, 'userRole'],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await fetch(`http://localhost:3000/users/role/${user?.email}`);
            const data = await res.json();
            return data?.role;
        }
    });

    return [role, isRoleLoading];
};

export default useRole;