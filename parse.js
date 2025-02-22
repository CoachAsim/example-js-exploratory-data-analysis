// Import required libraries
const csv = require('csv-parser');        // Helps us read CSV files
const fs = require('fs');                 // Helps us work with files
const Chart = require('cli-chart');       // Helps us create charts in the console
const prompt = require('prompt');         // Helps us get user input

/*
  IMPORTANT CONCEPT !!!READ!!!:
  Remember, there are several ways to create the same functionality when we are building software. An example of that is loading data from CSV files : )
  This example uses the csv-parser package/library. The type of data we load it as is an array of objects. It may be different if you use another package.

  1. What is an Array?
     - An array is like a list of items
     - Each item has a position number (index) starting from 0
     - In our weather data, we have an array of 14 days of weather information
     - Example: To get the 3rd day's data, we use: weatherData[2]
       (remember, we start counting from 0!)

  2. What is an Object?
     - An object is like a container that holds related information with labels
     - In our weather data, each day is an object with properties like:
         date: the date of the weather reading
         cloud_cover: how cloudy it was
         sunshine: amount of sunshine
         global_radiation: radiation level
         max_temp: highest temperature that day
         mean_temp: average temperature
         min_temp: lowest temperature
         precipitation: rainfall amount
         pressure: atmospheric pressure
         snow_depth: depth of snow

  3. Array of Objects
     - Our weather data is an array (list) of 14 day-objects
     - Example of one day's data might look like:
         {
           date: "20240101",
           cloud_cover: "6.5",
           sunshine: "2.3",
           global_radiation: "123.45",
           max_temp: "12.3",
           mean_temp: "10.1",
           min_temp: "8.4",
           precipitation: "0.2",
           pressure: "1013.2",
           snow_depth: "0"
         }
     - To get data: weatherData[0].global_radiation would give us the
       radiation level for the first day
*/

// This function loads data from our CSV file
const loadData = async () => {
    try {
        // Create an empty array that will store our 14 days of weather data
        // Each item in this array will be an object containing one day's measurements
        const data = [];
        
        // Create a readable stream from our CSV file
        const fileStream = fs.createReadStream('data/london_weather_edited.csv');
        
        // Set up our CSV parser
        const parser = fileStream.pipe(csv());
        
        // Read each row from the CSV file
        // Each row becomes an object with properties like:
        // date, cloud_cover, sunshine, global_radiation, etc.
        for await (const row of parser) {
            data.push(row);
        }
        
        console.log('Successfully loaded data!');
        return data;
    } catch (error) {
        console.error('Error loading data:', error.message);
        throw error;
    }
}

// Calculate the average radiation from our data
const calculateAverageRadiation = (data) => {
    // 'data' is our array of 14 days
    // We want to add up all the global_radiation values and divide by 14
    let radiationTotal = 0;
    
    // Loop through each day
    for (let i = 0; i < data.length; i++) {
        // Get the radiation value for this day
        // data[i] gets day number i's weather object
        // data[i].global_radiation gets just the radiation number from that day
        radiationTotal += Number(data[i].global_radiation);
    }

    // Calculate average (total divided by number of days) and round to 2 decimal places
    const averageRadiation = (radiationTotal / data.length).toFixed(2);
    return averageRadiation;
}

// Create a visualization of cloud cover
const createCloudCoverChart = (data) => {
    // Create a new chart with specific settings
    const chart = new Chart({
        xlabel: 'Days',           // Label for x-axis
        ylabel: 'Cloud Cover',    // Label for y-axis
        direction: 'y',          // Direction of the bars
        lmargin: 15,             // Left margin
        step: 4                  // Space between bars
    });

    // Loop through each of our 14 days
    for (let i = 0; i < data.length; i++) {
        // For each day, add its cloud cover value to our chart
        // data[i].cloud_cover gets the cloud cover measurement for day number i
        chart.addBar(data[i].cloud_cover, 'blue');
    }

    return chart;
}

// Display the menu and get user choice
const showMenu = async () => {
    console.log("\n=== London Weather Data Analysis ===");
    console.log("1. View the average radiation level");
    console.log("2. View a visualization of cloud cover");
    console.log("3. Exit");
    
    const { choice } = await prompt.get(['choice']);
    return choice;
}

// Main function that runs our program
const main = async () => {
    try {
        // Load our weather data - this will be an array of 14 days
        // Each day is an object containing that day's weather measurements
        const weatherData = await loadData();
        
        // Create our chart once (we'll reuse it)
        const cloudChart = createCloudCoverChart(weatherData);
        
        // Start the prompt system
        prompt.start();

        // Keep running until user chooses to exit
        while (true) {
            const choice = await showMenu();

            switch (choice) {
                case '1':
                    const avgRadiation = calculateAverageRadiation(weatherData);
                    console.log(`\nThe average radiation level is: ${avgRadiation} W/m²`);
                    break;
                    
                case '2':
                    console.log("\nDisplaying cloud cover visualization:");
                    console.log("--------------------------------");
                    cloudChart.draw();
                    console.log("Chart displayed!");
                    break;
                    
                case '3':
                    console.log("\nThanks for exploring London weather data!");
                    return;
                    
                default:
                    console.log("\nPlease choose a valid option (1, 2, or 3)");
            }
        }
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
}

// Start the program
main();