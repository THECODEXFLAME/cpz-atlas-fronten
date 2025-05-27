<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CPZ Atlas Dashboard - Quantum CBRN Defense</title>
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
    <div class="min-h-screen">
        <nav class="bg-white shadow">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    <div class="flex">
                        <div class="flex-shrink-0 flex items-center">
                            <h1 class="text-xl font-bold">CPZ Atlas</h1>
                            <span class="ml-2 text-sm text-gray-500">v0.5.10</span>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

        <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div class="px-4 py-6 sm:px-0">
                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <!-- Zeta-C Data -->
                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="p-5">
                            <div class="flex items-center">
                                <div class="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                                    <i class="fas fa-wave-square text-white"></i>
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="text-sm font-medium text-gray-500 truncate">
                                            Zeta-C Index
                                        </dt>
                                        <dd class="flex items-baseline">
                                            <div class="text-2xl font-semibold text-gray-900" id="zeta-c-value">
                                                Loading...
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- ELF Anomalies -->
                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="p-5">
                            <div class="flex items-center">
                                <div class="flex-shrink-0 bg-red-500 rounded-md p-3">
                                    <i class="fas fa-bolt text-white"></i>
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="text-sm font-medium text-gray-500 truncate">
                                            ELF Anomalies
                                        </dt>
                                        <dd class="flex items-baseline">
                                            <div class="text-2xl font-semibold text-gray-900" id="elf-value">
                                                Loading...
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Schumann Resonance -->
                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="p-5">
                            <div class="flex items-center">
                                <div class="flex-shrink-0 bg-green-500 rounded-md p-3">
                                    <i class="fas fa-broadcast-tower text-white"></i>
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="text-sm font-medium text-gray-500 truncate">
                                            Schumann Resonance
                                        </dt>
                                        <dd class="flex items-baseline">
                                            <div class="text-2xl font-semibold text-gray-900" id="schumann-value">
                                                Loading...
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Map Placeholder -->
                <div class="mt-6 bg-white shadow rounded-lg p-6">
                    <h3 class="text-lg font-medium text-gray-900">Global Monitoring</h3>
                    <div class="mt-4 aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg">
                        <div id="map" class="w-full h-96 rounded-lg"></div>
                    </div>
                </div>
            </div>
        </main>
    </div>

    <script>
        // Check authentication
        if (!localStorage.getItem('isAuthenticated')) {
            window.location.href = '/';
        }

        // Fetch data from API
        async function fetchData() {
            try {
                const [zetaResponse, elfResponse, schumannResponse] = await Promise.all([
                    fetch('https://localhost:8080/api/zeta-c'),
                    fetch('https://localhost:8080/api/elf-anomalies'),
                    fetch('https://localhost:8080/api/schumann')
                ]);

                const [zetaData, elfData, schumannData] = await Promise.all([
                    zetaResponse.json(),
                    elfResponse.json(),
                    schumannResponse.json()
                ]);

                // Update UI
                document.getElementById('zeta-c-value').textContent = 
                    zetaData.features ? 
                    `${zetaData.features[0].properties.ζ_c.toFixed(2)} (${zetaData.features[0].properties.tier})` :
                    'N/A';

                document.getElementById('elf-value').textContent = 
                    elfData.features ? 
                    `${elfData.features.length} detected` :
                    'None detected';

                document.getElementById('schumann-value').textContent = 
                    `${schumannData.frequencies.fundamental.toFixed(1)} Hz`;

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        // Initial fetch and set up interval
        fetchData();
        setInterval(fetchData, 30000);
    </script>
</body>
</html>
