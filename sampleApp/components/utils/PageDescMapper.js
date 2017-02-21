const PageDescMapper = {
  intro: {
    title: 'Welcome to the Saxo Bank Open Api - Feature Samples',
    desc: 'Open API provides access to all of the resources and functionality required to build a high performance multi-asset trading platform. It is a sample application to explain different functionalities and features offered by OpenAPIs. OpenAPIs require authorization token.',
  },
  home: {
    title: 'Set Access Token',
    desc: 'OpenAPIs require authorization token to authenticate user.',
  },
  instruments: {
    title: 'Reference Data - Instruments',
    desc: 'The Reference Data service group provides reference data, such as instrument details, exchange info etc.. The instrument endpoints serves as the starting point for an application/user who wants to navigate the available universe of instruments and options. Each entry therefore contrains further references to instrument details or option roots, where the application can get further information about these entities.',
  },
  infoPrices: {
    title: 'Info Prices',
    desc: 'Shows how to get prices and other trade related information and keep the prices updated as events are recieved over the streaming channel.',
  },
  prices: {
    title: 'Prices - Streaming',
    desc: 'Shows how to get prices and other trade related information and keep the prices updated as events are recieved over the streaming channel.',
  },
  clientPortfolio: {
    title: 'Orders/Positions',
    desc: 'Shows only end points serving orders and positions',
  },
  orders: {
    title: 'Order',
    desc: 'Describs about order placement',
  },
  options: {
    title: 'Option Chain',
    desc: 'Shows how to get option chain based on option root selected',
  },
  chartPolling:{
    title: 'Chart Polling',
    desc: 'Fetches Chart Data'
  },
  chartStreaming:{
    title: 'Chart Streaming',
    desc: ' Chart Streaming Data'
  },
};

export default PageDescMapper;
