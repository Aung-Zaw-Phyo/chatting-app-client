import {useState, useCallback} from "react";

const useHttp = () => {
  
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null); 
  
    const sendRequest = useCallback(async (requestConfig, applyData) => {
        setIsLoading(true);
        setError(null);
        try {
          const response = await fetch(requestConfig.url, {
              method: requestConfig.method ? requestConfig.method : 'GET',
              credentials: 'include',
              headers: requestConfig.headers ? requestConfig.headers : {},
              body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
            });
            if(response.status === 404) {
                throw await response.json()
            }
            if(response.status === 422) {
                throw await response.json()
            }
            if(response.status === 401) {
                throw await response.json()
            }
            if (!response.ok) {
                throw new Error('Request failed!');
            }
            
            const data = await response.json();
            
            applyData(data)
            
        } catch (err) {
            setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);
    }, []);

    return {
        isLoading, 
        error,
        sendRequest
    }
}

export default useHttp
