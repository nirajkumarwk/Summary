export const parseSection = (
  section: string
): {
  title: string;
  points: string[];
} => {
  const [title, ...content] = section.split("\n");

  const cleanTitle = title.startsWith("#")
    ? title.substring(1).trim()
    : title.trim();

  const points: string[] = [];

  let currentPoint = "";
  content.forEach((line) => {
    const trimmedLine = line.trim();
    // console.log("Trimmed line outside", trimmedLine);

    if (trimmedLine.startsWith("·")) {
      currentPoint = trimmedLine;
      //   console.log('current point',currentPoint );

      if (currentPoint) {
        points.push(currentPoint.trim());
        // console.log('current line',currentPoint.trim())
      }
    } else if (trimmedLine) {
      currentPoint = trimmedLine;
      // console.log("Trimmed line inside", trimmedLine);
      if (currentPoint) points.push(currentPoint.trim());
      currentPoint = "";
    } else {
      currentPoint += " " + trimmedLine;
    }
  });
  // console.log("CurrentPoint", currentPoint);

  //   if (currentPoint) {
  //         points.push(currentPoint.trim())
  //         console.log('current line',currentPoint.trim())
  //       };

  // console.log("points outside the content", points);

  return {
    title: cleanTitle,
    points: points.filter(
      (point) => point && !point.startsWith("#") && !point.startsWith("[Choose")
    ),
  };
};

// export const parseSection = (section: string): { title: string; points: string[] } => {
//     const [title, ...content] = section.split("\n");

//     const cleanTitle = title.startsWith("#") ? title.substring(1).trim() : title.trim();

//     const points: string[] = [];
//     let currentPoint = "";

//     content.forEach((line) => {
//       const trimmedLine = line.trim();
//       if (trimmedLine.startsWith("·")) {
//         // If we already have a current point, push it before starting a new one
//         if (currentPoint) {
//           points.push(currentPoint.trim());
//         }
//         currentPoint = trimmedLine; // Start a new point
//       } else if (trimmedLine) {
//         // Append to the current point if the line doesn't start with a bullet
//         currentPoint += " " + trimmedLine;
//       }
//       // If the line is empty, we can optionally reset currentPoint, but it's not necessary here
//     });

//     // Push the last point if it exists
//     if (currentPoint) {
//       points.push(currentPoint.trim());
//     }

//     return {
//       title: cleanTitle,
//       points: points.filter(
//         (point) => point && !point.startsWith("#") && !point.startsWith("[Choose")
//       ),
//     };
//   };
