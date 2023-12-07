// Utility function to get future date based on given days, months, and years
export const getFutureDate = (daysToAdd, monthsToAdd, yearsToAdd) => {
      // Get today's date
      const currentDate = new Date();
    
      // Calculate future date
      const futureDate = new Date(
        currentDate.getFullYear() + yearsToAdd,
        currentDate.getMonth() + monthsToAdd,
        currentDate.getDate() + daysToAdd
      );
    
      // Extract day, month, and year from the future date
      const futureDay = futureDate.getDate();
      const futureMonth = futureDate.getMonth() + 1; // Adding 1 because months are zero-indexed
      const futureYear = futureDate.getFullYear();
    
      // Return the future date as a string (formatted as "YYYY-MM-DD")
      return `${futureYear}-${futureMonth < 10 ? '0' + futureMonth : futureMonth}-${futureDay < 10 ? '0' + futureDay : futureDay}`;
    };
   