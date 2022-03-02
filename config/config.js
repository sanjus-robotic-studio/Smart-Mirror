/* Magic Mirror Config Sample
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information on how you can configure this file
 * see https://docs.magicmirror.builders/getting-started/configuration.html#general
 * and https://docs.magicmirror.builders/modules/configuration.html
 */
var config = {
  address: "localhost",
  electronOptions: {
    webPreferences: {
      webviewTag: true
    }
  },
  port: 8080,
	basePath: "/", 	// The URL path where MagicMirror is hosted. If you are using a Reverse proxy
					// you must set the sub path here. basePath must end with a /
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"], 	// Set [] to allow all IP addresses
															// or add a specific IPv4 of 192.168.1.5 :
															// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
															// or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
															// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: false, 		// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "", 	// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "", 	// HTTPS Certificate path, only require when useHttps is true

	language: "en",
	locale: "en-US",
	logLevel: ["INFO", "LOG", "WARN", "ERROR"], // Add "DEBUG" for even more logging
	timeFormat: 24,
	units: "metric",
	// serverOnly:  true/false/"local" ,
	// local for armv6l processors, default
	//   starts serveronly and then starts chrome browser
	// false, default for all NON-armv6l devices
	// true, force serveronly mode, because you want to.. no UI on this device

	modules: [
		{
   			module: 'MMM-Face-Reco-DNN',
    			config: {
      				// Logout 15 seconds after user was not detected any more
      				// If they are detected within this period, the delay will start again
      				logoutDelay: 15000,
      				// How often the recognition starts in milliseconds
      				// With a Raspberry Pi 3+ it works well every 2 seconds
      				checkInterval: 2000,
      				// Module set used for when there is no face detected ie no one is in front of the camera
      				noFaceClass: 'noface',
      				// Module set used for when there is an unknown/unrecognised face detected
      				unknownClass: 'unknown',
      				// Module set used for when there is a known/recognised face detected
      				knownClass: 'known',
      				// Module set used for strangers and if no user is detected
      				defaultClass: 'default',
      				// Set of modules which should be shown for any user ie when there is any face detected
      				everyoneClass: 'everyone',
      				// Set of modules that are always shown - show if there is a face or no face detected
      				alwaysClass: 'always',
      				// XML to recognize with haarcascade
      				cascade: 'modules/MMM-Face-Reco-DNN/tools/haarcascade_frontalface_default.xml',
      				// Pre-encoded pickle with the faces
      				encodings: 'modules/MMM-Face-Reco-DNN/tools/encodings.pickle',
     				// Use Raspberry Pi camera or another type
      				// 1 = RasPi camera, 0 = other camera
      				usePiCamera: 1,
      				// If using another type of camera, you can choose
      				// i.e. 0 = /dev/video0 or 'http://link.to/live'
      				source: 0,
      				// Rotate camera
      				rotateCamera: 0,
      				// Method of facial recognition
      				// dnn = deep neural network, haar = haarcascade
      				method: 'dnn',
      				// Which face detection model to use
      				// "hog" is less accurate but faster on CPUs
      				// "cnn" is a more accurate deep-learning model which is GPU/CUDA accelerated
      				detectionMethod: 'hog',
      				// How long in milliseconds modules take to hide and show
      				animationSpeed: 0,
      				// Path to Python to run the face recognition
      				// null or '' means default path
      				pythonPath: null,
     				 // Should a welcome message be shown using the MagicMirror alerts module?
      				welcomeMessage: true,
      				// Dictionary for person name mapping in welcome message
      				// Allows for displaying name with complex character sets in welcome message e.g. jerome => Jérôme, hideyuki => 英之
      				usernameDisplayMapping: null,
      				// Capture new pictures of recognized people, if unknown we save it in folder "unknown"
      				// So you can extend your dataset and retrain it afterwards for better recognitions
      				extendDataset: false,
      				// If extendDataset is true, you need to set the full path of the dataset
      				dataset: 'modules/MMM-Face-Reco-DNN/dataset/',
      				// How much distance between faces to consider it a match. Lower is more strict.
      				tolerance: 0.6,
      				// allow multiple concurrent user logins, 0=no, any other number is the maximum number of concurrent logins
      				multiUser: 0,
    				}
		},
		{
		  module: "MMM-Detector",
		  position: "top_right",
		  configDeepMerge: true,
		  config: {
		    debug: false,
		  }
		},
		{
		  module: "MMM-GoogleAssistant",
		  position: "bottom",
		  configDeepMerge: true,
		  classes:"always",
		  config: {
		    debug: false,
		    assistantConfig: {
		    lang: "en-US",
		    projectId: "", // Required to use gaction.
		    modelId: "", // (OPTIONAL for gaction)
		    instanceId: "", // (OPTIONAL for gaction)
		    latitude: 13.08784,
		    longitude:  80.27847,
		 			},
		
		   responseConfig: {
		     useScreenOutput: true,
		     screenOutputCSS: "screen_output.css",
		     screenOutputTimer: 5000,
		     screenRotate: false,
		  activateDelay: 250,
		  useAudioOutput: true,
		  useChime: true,
		  newChime: false,
		  useNative: true,
		  playProgram: "mpg123"
		},
		
		micConfig: {},
		    Extented: {
		      useEXT: true,
			deviceName: "MagicMirror",
			stopCommand: "stop",
		      youtube: {
			useYoutube: true,
			  youtubeCommand: "play",
			  displayResponse: true,
			  useVLC: true,
			  minVolume: 30,
			  maxVolume: 100
			},
		      links: {
			 useLinks: true,
			  displayDelay: 60 * 1000,
			  scrollActivate: false,
			  scrollStep: 25,
			  scrollInterval: 1000,
			  scrollStart: 5000
			},
		      photos: {
			usePhotos: true,
			  useGooglePhotosAPI: true,
			  displayType: "none",
			  displayDelay: 10 * 1000,
			  albums: [],
			  sort: "new",
			  hiResolution: true,
			  timeFormat: "DD/MM/YYYY HH:mm",
			  moduleHeight: 300,
			  moduleWidth: 300,
			},
		      
		      cast: {
			useCast: true,
			  port: 8569
			},
		    },
		    NPMCheck: {
			useAlerts: false,
				}
		  }
		},

		{
			module: "alert",
		},
		{
			module: "updatenotification",
			position: "top_bar",

		},
		{
			module: "clock",
			position: "top_left",
			classes: "Always"
		},
		{
			module: "weather",
			position: "top_right",
			config: {
				weatherProvider: "openweathermap",
				type: "current",
				location: "Chennai",
				locationID: "1264527", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				apiKey: "2a4aa1e96e74e8213fbd701be41f0972"
			},
			classes: "always"
		},
		{
			module: "weather",
			position: "top_right",
			header: "Weather Forecast",
			config: {
				weatherProvider: "openweathermap",
				type: "forecast",
				location: "Chennai",
				locationID: "1264527", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				apiKey: "2a4aa1e96e74e8213fbd701be41f0972"
			},
			classes: "always"
		},
		{
  			module: "MMM-Face-Multi-User-Recognition-SMAI",
			position: "top_right",
  			config: {
    				useMMMFaceRecoDNN: true
  				},
			classes: "always"
  
  
		},
		{
    			module: "MMM-Stock",
    			position: "top_left",
    			config: {
    				companies: ["MSFT", "GOOG", "ORCL", "FB", "AAPL"]
    				},
			classes: "anand"
		},
		{
			module: "MMM-cryptocurrency",
			position: "top_left",
			config: {
				apikey: 'd32eebe8-7dc1-49e0-a845-5e2eb177fa42',
				currency: ['ethereum', 'bitcoin'],
				conversion: 'EUR',
				headers: ['change24h', 'change1h', 'change7d'],
				displayType: 'logoWithChanges',
				showGraphs: true
				},
			classes: 'anand'
		},
		{
            		module: 'MMM-OnThisDay',
            		position: "top_left", // All available positions
            		config: {
                		// See below for configurable options, this is optional
            			},
			classes: 'sanjiv'
        	},
		{
    			module: "MMM-wiki",
    			position: "top_left",
    			config: {
        			updateInterval: 30000,
        			language: "en",
        			characterLimit: 500,
        			category: "DidYouKnow",
        			badTitles: [
            				"Graphical",
            				"timeline",
            				"List"
        				],
        			badContents: [
            				"This article",
            				"See also",
            				"redirects here",
            				"The following outline",
            				"may refer to"
        				],
    				},
			classes: "maheswari"
		}
	
		
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
