export const config = {
  header: {
    //Targert the time header containing the information month/day of the week, day and time.
    top: {
      //Tartget the month elements

      style: {
        backgroundColor: String(`#69c0ff`),

        borderBottom: 'white',
      }, //The style applied to the month elements
    },
    middle: {
      //Tartget elements displaying the day of week info
      style: {
        backgroundColor: String(`#91d5ff`),
        borderBottom: 'white',
      }, //The style applied to the day of week elements
      // selectedStyle: { backgroundColor: 'red' }, //The style applied to the day of week elements when is selected
    },
    bottom: {
      style: {
        background: '#69c0ff',
        fontSize: 10,
        borderBottom: 'white',
      }, //the style tp be applied
    },
  },
  // taskList: {
  //   //the right side task list
  //   title: {
  //     //The title od the task list
  //     label: 'Work', //The caption to display as title
  //     style: {
  //       fontSize: '20px',
  //       backgroundColor: String('#40a9ff'),
  //       borderBottom: 'solid 1px silver',
  //       color: 'white',
  //       textAlign: 'center',
  //     }, //The style to be applied to the title
  //   },
  // task: {
  //   style: {
  //     backgroundColor: 'white',
  //     fontSize: '15px',
  //     fontstyle: 'bold',
  //   }, // the style to be applied
  // },
  // verticalSeparator: {
  //   //the vertical seperator use to resize he width of the task list
  //   style: { display: 'none' }, //the style
  //   grip: {
  //     //the four square grip inside the vertical separator
  //     style: { visbility: 'hidden' }, //the style to be applied
  //   },
  //   },
  // },
  dataViewPort: {
    //The are where we display the task
    rows: {
      //the row constainting a task
      style: {
        borderBottom: '1.5px solid #bae7ff',
        backgroundColor: 'white',
        // borderBottom: 'solid 0.5px #cfcfcd',
      },
    },
    task: {
      showLabel: false, //If the task display the a lable
      style: {
        border: 0,
        position: 'absolute',
        borderRadius: 14,
        color: 'white',
        textAlign: 'center',
        backgroundColor: 'white',
      },
    },
  },
  links: {
    //The link between two task
    backgroundColor: 'white',
    color: 'black',
    selectedColor: '#ff00fa',
  },
};
