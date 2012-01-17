
c.width = w = 640
c.height = h = 480

I // score
	= c // counter
	= X = Y // mousexy
	= O // delta
		= 0
B = '#000'
n = Math.random
H = [] /* shots */

/* generate snowmen */
M = []
for (i = 9; i--;) {
	M.push([
		n() * w, // x
		n() * h - h, // y
		n() / 2 + 0.3, // size
		50 + n() * 50 // velocity
	])
}

onmousemove = function(e) {
	X = e.clientX
	Y = e.clientY
}

setInterval(function() {
	with (a) {
		/* shortcuts */
		a.P = beginPath
		a.L = lineTo
		f = 'fillStyle'
		a.F = fill
		a.C = function(x, y, s) {
			a.arc(x, y, s, 0, Math.PI * 2, 1)
		}

		/* calculate delta shit */
		/* N = time now */
		/* O = time old */
		N = (new Date).getTime()
		d = O ? (N - O) / 999 : 0
		O = N

		/* fill background */
		a[f] = '#DEF'
		fillRect(0, 0, w, h)
		
		/* angle */
		A = Math.atan((h - Y) / ((w / 2) - X)) - (X < w / 2 ? 3.1 : 0)
		
		/* fire */
		!(c++ % 10) && H.push([ w / 2, h, A ])

		a[f] = B // black
		
		/* score */
		fillText(I, 20, 20)

		/* cannon */
		C(w / 2, h, 5)
		F()

		/* ammo */
		for (i = H.length; i--;) {
			P()
			S = H[i]
			C(S[0], S[1], 2)
			S[0] += (d * 200) * Math.cos(S[2])
			S[1] += (d * 200) * Math.sin(S[2])
			F()
			if (S[1] < 0) {
				H.splice(i,1)
			}
		}

		a[f] = '#fff' // snowmen color

		/* loop snowmen */
		for (i = 9; i--;) {
			/* snowmen object with x, y, size, velocity */
			m = M[i]

			/* shortcuts */
			x = m[0]
			y = m[1]
			s = m[2]
			
			/* inc y */
			m[1] += d * m[3]

			/* reach ground? go up again */
			if (y > h) {
				m[1] = -9
				I = I - 9 // dec score
			}
			
			/* collision detection */
			for (j = H.length; j--;) {
				l = H[j]
				if (Math.sqrt(((x - l[0]) * (x - l[0])) + ((y - l[1]) * (y - l[1]))) <= 20) {
					m[1] = l[1] = -100
					I++ // inc score
				}
			}

			/* draw snowman */

			save()
			translate(x, y)
			scale(s, s)

			P()
			C(0, 30, 20) // body
			C(0, 0, 15) // head
			F()
			
			a[f] = B // black

			/* eyes */
			P()
			C(- 5, - 5, 2)
			C(5, - 6, 2)
			F()
			
			/* mouth */
			P()
			moveTo(- 3, 6)
			L(3, 6)
			stroke()
			
			/* nose */
			a[f] = '#EC7' // orange
			P()
			C(0, 0, 3)
			F()

			restore()
		}
	}
}, 1000 / 60)
