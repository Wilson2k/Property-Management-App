import { Navigate } from "react-router-dom";
import React from "react";
import { useProfile } from "../Hooks/User/useProfile";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
    const { status, data } = useProfile();
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