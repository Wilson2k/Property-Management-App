import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../config/ApiService";

export default function Profile() {
    const { status, data } = useQuery({
        queryKey: ['profile'],
        queryFn: getUser,
    })
    if (status === 'loading') {
        return <span>Loading...</span>
    }
    if(status === 'error'){
        return <span>Unexpected error</span>
    }
    if(data?.status !== 200){
        return <div>{data?.data}</div>
    }
    return (
        <div>
            <li>{data?.data.id}</li>
            <li>{data?.data.firstName}</li>
            <li>{data?.data.lastName}</li>
            <li>{data?.data.email}</li>
        </div>
    );
}
