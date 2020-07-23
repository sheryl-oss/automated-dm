//run as node testDM.js username password

const { IgApiClient } = require('./instagram-private-api/src');

var args = process.argv.slice(2);

(async () =>	{
	var ig = new IgApiClient();
	ig.state.generateDevice(args[0]);
    await ig.simulate.preLoginFlow();
    await ig.account.login(args[0], args[1]);
    console.log(args[0] + " logged in!"); 

    try {
    	//run in every 1 minute
	   	setInterval(async() =>	{
	   		const items = await ig.feed.directPending().items();
			items.forEach(async item => await ig.directThread.approve(item.thread_id));

	   		var messages = await ig.feed.directInbox().items()
	   		for (var i = 0; i < messages.length; i++)	{
	   			if(messages[i].read_state == 1)	{
	   				console.log('found-something')
	   				var userId = await ig.user.getIdByUsername(messages[i].thread_title)
	   				var thread = ig.entity.directThread([userId.toString()])
	   				await thread.broadcastText('message only if your mum needs a shag')
	   			}
	   		}	
	   	}, 60000)	
    } catch(err)	{
    	console.log(err)
    }
    
})().catch(console.log)
