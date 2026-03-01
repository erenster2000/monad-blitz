# Monad Hackathon Backend API

This document describes the available API endpoints of the Monad Hackathon backend service and how to use them.

---

## 1. Health Check

Used to check if the server is running.

-   **Method:** `GET`
-   **Path:** `/`

### Request

Does not require any parameters or body.

### Successful Response

-   **Status Code:** `200 OK`
-   **Body:**
    ```
    Monad Hackathon Backend is Running! 🚀
    ```

### Example `curl` Request

```bash
curl http://localhost:3001/
```

---

## 2. Token Metadata Generation

This is the main endpoint of the service. It analyzes the latest tweets of a specified Twitter user, finds a dominant topic, generates a relevant image, and returns a JSON object containing the token metadata.

-   **Method:** `POST`
-   **Path:** `/api/generate`

### Request

-   **Headers:**
    -   `Content-Type: application/json`
-   **Body:**

    ```json
    {
      "twitterUsername": "string"
    }
    ```

    -   `twitterUsername` (required): The Twitter username to analyze (without the '@' prefix).

### Successful Response

-   **Status Code:** `200 OK`
-   **Body:**

    ```json
    {
        "name": "Monad Token for <username>",
        "description": "A unique token generated based on the analysis of the latest tweets from @<username>. The central theme is: <topic>.",
        "image": "https://via.placeholder.com/500x500.png?text=<topic>",
        "attributes": [
            {
                "trait_type": "Topic",
                "value": "<topic>"
            },
            {
                "trait_type": "Source Account",
                "value": "@<username>"
            }
        ]
    }
    ```

### Error Responses

-   **Status Code:** `400 Bad Request`
    -   When the `twitterUsername` parameter is not provided.
    ```json
    {
        "error": "Twitter username is required."
    }
    ```

-   **Status Code:** `404 Not Found`
    -   When no tweets are found for the user or the account is private.
    ```json
    {
        "error": "No tweets found for this user or account is private."
    }
    ```

-   **Status Code:** `500 Internal Server Error`
    -   When an unexpected server error occurs during data fetching, analysis, or image generation.
    ```json
    {
        "error": "Failed to generate token metadata."
    }
    ```

### Example `curl` Request

```bash
curl -X POST http://localhost:3001/api/generate \
-H "Content-Type: application/json" \
-d '{"twitterUsername": "elonmusk"}'
```
