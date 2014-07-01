
tempplate = """
.dwarv-%s.sprite-%s {
	background: url('dwarves.png') no-repeat %spx %spx;
	width: 100px;
	height: 80px;
}
"""

for y in range(0,12):
	for x in range(0, 20):
		print tempplate % (y+1, x+1, -1*x*100, -1*y*80)