var sieve = function(n)
{

	var items = [];
	for(var i=2; i<=n; i++)
		items.push(i);

	for(var i=0; i < items.length; i++){

		var temp = items[i];
		
		if(temp != 'x')
		{
		   for(var j=i+1; j<items.length; j++)
		   {

			var temp2 = items[j];
			if(temp2 !='x')
			{
				if(temp2%temp == 0)
				{
					items[j] = 'x';
				}
			}
		   }
		}	
		
	}
	console.log(items);

	for(var i=items.length; i--;)
	{
		if(items[i]=='x')
		{
			items.splice(i,1);
		}
	}
	console.log(items);
}
sieve(30);
