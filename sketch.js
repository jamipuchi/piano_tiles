tiles = [];
speed = 1;
playing = true
rows = 5
cols = 4
score = 0

function setup() {

	createCanvas(400, 600);
	tileX = width / cols;
	tileY = height / rows;
	for (i = 0; i < rows + 1; i++) {
		tiles.push({
			clicat: true,
			ypos: height - height / rows * i,
			negra: -1
		});
	}

}

function draw() {

	if (playing) {
		play()
	} else {
		background(255, 0, 0)
		fill(255)
		textAlign(CENTER)
		textSize(height/15)
		text(score, width/2, height/2.5+height/10)
		text('RETRY', width/2, height/2+height/10);
	}
}

function mouseClicked() {

	if (!playing) {

		tiles = []
		speed = 1
		playing = true
		score = 0
		setup()

	} else {

		mY = Math.floor(((height - (mouseY - tiles[tiles.length - 1].ypos)) / height * 5) + 1);
		mX = Math.floor(mouseX / width * cols);

		if (tiles[mY].negra === mX) {
			if (!tiles[mY].clicat){
				tiles[mY].clicat = true;
				score +=1;
			}
		} else {
			playing = false;
			speed = 1;
		}
	}

}

function play() {

	background(220);

	if (tiles[tiles.length - 1].ypos > 0) {
		tiles.push({
			clicat: false,
			ypos: tiles[tiles.length - 1].ypos - height / rows,
			negra: Math.floor(random(cols))
		});
		tiles.splice(0, 1);
	}

	for (i = 0; i < tiles.length; i++) {
		for (j = 0; j < cols; j++) {
			if (j == tiles[i].negra) {
				if (tiles[i].clicat) {
					fill(100);
				} else fill(0);
			} else {
				fill(255);
			}
			rect(width / cols * j - 0.5, tiles[i].ypos, tileX, tileY);
		}
		tiles[i].ypos += speed;
	}

	speed += 0.005;
	if (tiles[0].ypos > height - height / 8 && !tiles[0].clicat) playing = false
	fill(255,0,0)
	text(score, 20,30);
}
