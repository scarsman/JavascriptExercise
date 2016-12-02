
var Soldier = function(num){
	this.position = num;
	this.next = null;
}
var Squad = {
	josephus: function(numberOfSoldiers, steps){
		this.first = null;
		this.last =null;
		
		var index = 1;
		while(index <= numberOfSoldiers){

			
			var soldier = new Soldier(index);

			if(soldier.position == 1)
			{
				this.first = soldier;
				this.last = soldier;

			}else{
				soldier.next = this.first;
				this.last.next = soldier;
				this.last = soldier;
			}		

			//console.log(soldier);

		index++;	
		}

		this.survivor = function(step){
			
			var prev = this.last;
			var current = prev;

			while(current.next !== current)
			{
				var index = 1;
		
				while(index <= step)
				{
					prev = current;
					current = current.next;	
				index++;				

				}
			console.log("removal of soldier sequence in position " + current.position);
			prev.next = current.next;
			current = prev;		
										
			}
			
			return "The survivor is in the position "+ current.position;
		}
		return this.survivor(steps);
	}	
			
};

console.log(Squad.josephus(10,3));
//console.log(Squad.josephus(1000000,3));
//console.log(Squad.josephus(500,4));
