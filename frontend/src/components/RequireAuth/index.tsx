
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../utils/ApiService";
import { Navigate } from "react-router-dom";
import React from "react";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
    const { status, data } = useQuery({
        queryKey: ['profile'],
        queryFn: getUser,
    });
    if (status === 'loading') {
        return <span>Loading...</span>;
    }
    if (status === 'error') {
        return <span>Unexpected error</span>;
    }
    if (status === 'success' && data?.status === 200) {
        return (<>{children}</>);
    }
    return <Navigate to="/login" />;
}