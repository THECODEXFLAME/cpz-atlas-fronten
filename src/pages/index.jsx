<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CPZ Atlas - Quantum CBRN Defense</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background-color: #f8fafc;
        }
    </style>
</head>
<body class="min-h-screen bg-gray-50">
    <div class="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-lg">
        <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">
            Secure Access Portal
        </h2>
        
        <form id="loginForm" class="space-y-6">
            <div>
                <label for="email" class="block text-sm font-medium text-gray-700">
                    Email Authentication
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter your email"
                    required
                />
            </div>

            <button
                type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Request Access
            </button>

            <div id="message" class="text-center text-sm"></div>
        </form>

        <div class="mt-6 text-center text-xs text-gray-500">
            Access is granted via SHA-256 hashed email verification.
            <br />
            No biometric data is collected or stored.
        </div>
    </div>

    <script>
        document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const messageDiv = document.getElementById('message');
            
            try {
                const response = await fetch('http://localhost:8080/api/request-access', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: email }),
                });

                const data = await response.json();
                
                if (response.ok) {
                    messageDiv.className = 'text-center text-sm text-green-600';
                    messageDiv.textContent = data.message;
                    if (data.message.includes('granted immediately')) {
                        localStorage.setItem('isAuthenticated', 'true');
                        window.location.href = '/dashboard.html';
                    }
                } else {
                    throw new Error(data.detail || 'Failed to request access');
                }
            } catch (error) {
                messageDiv.className = 'text-center text-sm text-red-600';
                messageDiv.textContent = error.message;
                console.error('Error:', error);
            }
        });
    </script>
</body>
</html>
