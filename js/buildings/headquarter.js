function HeadquarterBuilding(pos_x, pos_y)
{
	this._proto = HeadquarterBuilding;
	this.health_max = 750;
	this.construction_max = 750;
	
	this.producing_queue = [];
	this.producing_start = 0;
	
	this.setPosition(pos_x, pos_y);
	
	this.run = function()
	{
		switch (this.state)
		{
			case 'CONSTRUCTION':
				this._runStandartConstruction();
				break;
				
			case 'PRODUCING':
				this.producing_queue[0].construction_progress += 1 / (50 * this.producing_queue[0].construction_time);
				if (this.producing_queue[0].construction_progress > 1)
				{
					var cell = this.getCell(), unit = AbstractUnit.createNew(this.producing_queue[0], cell.x + 2, cell.y + 2);
					//Find compatable point for exit
					unit.move(cell.x, cell.y + 5);
					
					this.producing_queue[0].construction_progress = 0;
					this.producing_queue[0].construction_queue--;
					this.producing_queue.shift();
					this.state = 'NORMAL';
				}
				break;
				
			case 'NORMAL':
				if (this.producing_queue.length > 0)
				{
					this.producing_start = (new Date).getTime();
					this.state = 'PRODUCING';
				}
				break;
		}
	}
	
	this.produce = function(obj)
	{
		this.producing_queue.push(obj);
	}
}

HeadquarterBuilding.prototype = new AbstractBuilding();

HeadquarterBuilding.box_image = 'headquarter_box.png';
HeadquarterBuilding.res_key = 'headquarter.png';
HeadquarterBuilding.obj_name = 'Headquarter 1';
HeadquarterBuilding.cost = 750;
HeadquarterBuilding.energy = 100;
HeadquarterBuilding.enabled = true;
HeadquarterBuilding.count = 0;
HeadquarterBuilding.cell_size = {x: 5, y: 4};
HeadquarterBuilding.cell_matrix = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
HeadquarterBuilding.move_matrix = [0,0,1,1,1,1,1,0,0,1,0,0,1,1,1,1,0,1,1,1];
HeadquarterBuilding.cell_padding = {x: 2, y: 2};
HeadquarterBuilding.image_size = {x: 103, y: 138};
HeadquarterBuilding.image_padding = {x: -9, y: 42};
HeadquarterBuilding.require_building = [];

HeadquarterBuilding.loadResources = function(){
	game.resources.addImage(this.res_key, 'images/buildings/headquarter.png');
};