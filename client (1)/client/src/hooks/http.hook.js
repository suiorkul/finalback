import { useState, useCallback } from "react"

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)
        try {
            if (body) {
                body = JSON.stringify(body)
                headers["Content-Type"] = "application/json"
            }

            const response = await fetch(url, { method, body, headers })
                .then(setLoading(true))
            const data = await response.json()
                .then(setLoading(false))

            // if (!response.ok) {
            //     throw new Error(data.message || "Something went wrong")
            // }

            setLoading(false)

            return data
        } catch (e) {
            setLoading(false)
            setError(e.messageRU)
            throw e
        }
    }, [])

    const clearError = useCallback(() => setError(null), [])

    const API_URL = `https://java-final1.herokuapp.com/api/main`

    return { loading, request, error, clearError, API_URL }
}
