/**
 * git do not control webim.config.js
 * everyone should copy webim.config.js to webim.config.js
 * and have their own configs.
 * In this way , others won't be influenced by this config while git pull.
 *
 */

// for react native
let location = {
	protocol: "https"
};

let config = {
	/*
	 * socket server
	 */
  socketServer: 'wss://im-api-wechat.easemob.com/websocket', //小程序线上环境
  /* 这里注意，需要配置的域名，如果不发布的话，开发者工具里面打开不检查域名合法性即可 */

  /*
	 * Backend REST API URL
	 */
	// apiURL: (location.protocol === 'https:' ? 'https:' : 'http:') + '//a1.easemob.com',
	apiURL: "https://a1.easemob.com", // 线上环境

  /*
	 * Application AppKey
	 */
	appkey: "1149220506084721#demo",  // 修改为自己的appid

  /*
	 * Whether to use HTTPS      '1177161227178308#xcx'
	 * @parameter {Boolean} true or false
	 */
	https: false,

  /*
	 * isMultiLoginSessions
	 * true: A visitor can sign in to multiple webpages and receive messages at all the webpages.
	 * false: A visitor can sign in to only one webpage and receive messages at the webpage.
	 */
	isMultiLoginSessions: false,

  /**
	 * Whether to use window.doQuery()
	 * @parameter {Boolean} true or false
	 */
	isWindowSDK: false,

  /**
	 * isSandBox=true:  xmppURL: 'im-api.sandbox.easemob.com',  apiURL: '//a1.sdb.easemob.com',
	 * isSandBox=false: xmppURL: 'im-api.easemob.com',          apiURL: '//a1.easemob.com',
	 * @parameter {Boolean} true or false
	 */
	isSandBox: false,

  /**
	 * Whether to console.log in strophe.log()
	 * @parameter {Boolean} true or false
	 */
	isDebug: true,

  /**
	 * will auto connect the xmpp server autoReconnectNumMax times in background when client is offline.
	 * won't auto connect if autoReconnectNumMax=0.
	 */
   autoReconnectNumMax: 5,

   /**
	 * the interval secons between each atuo reconnectting.
	 * works only if autoReconnectMaxNum >= 2.
	 */
	autoReconnectInterval: 2,

  /**
	 * webrtc supports WebKit and https only
	 */
	isWebRTC: false,

  /*
	 * Set to auto sign-in
	 */
	isAutoLogin: true,

	heartBeatWait: 30000,

	/*
	* 需要替换成自己的声网 appId，此 appId 有限量，仅供参考使用，同时获取声网 token 的接口仅能供此 appId 使用，换成自己的 appId 后需要自己去实现 app server 获取声网token。
	*/
	AgoraAppId:'15cb0d28b87b425ea613fc46f7c9f974' 

};

export default config;
