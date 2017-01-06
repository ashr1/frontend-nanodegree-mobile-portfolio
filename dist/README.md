## Website Performance Optimization portfolio project

The project was about optimization.  I have optimized both parts to this project: 
	1) the initial delivery for the index.html landing page (> 90 pagespeed score)  
	2) made the pizza.html scroll at 60fps and pizza resize at < 5ms using the slider

### Getting started

I used the build tool Grunt to help optimize my project. To work/edit on my project you will need grunt installed on your computer.

Visit [Grunt](http://gruntjs.com/getting-started for details.) for details.  Here's the gist on its relation to this project:

* go to the project's root directory (where you can see a dist folder) and you will find a Gruntfile.js.  It details all the tasks I run.  Run the command 'grunt' (in the root directory)
  and you'll get the post build project in the dist folder.

* I used gh-pages for the url for pagespeed insights, but ngrok can be used too.  

  Ngrok instructions:

1. Check out the repository
1. To inspect the site on your phone, you can run a local server

  ```bash
  $> cd /path/to/your-project-folder
  $> python -m SimpleHTTPServer 8080
  ```

1. Open a browser and visit localhost:8080
1. Download and install [ngrok](https://ngrok.com/) to the top-level of your project directory to make your local server accessible remotely.

  ``` bash
  $> cd /path/to/your-project-folder
  $> ./ngrok http 8080
  ```

1. Copy the public URL ngrok gives you and try running it through PageSpeed Insights! Optional: [More on integrating ngrok, Grunt and PageSpeed.](http://www.jamescryer.com/2014/06/12/grunt-pagespeed-and-ngrok-locally-testing/)

####Part 1: Optimize PageSpeed Insights score for index.html

Here are the optimizations I made:
* media = print attribute for the print.css page
* put async on the analytics.js script
* made the google font async load via web font loader

	```javascript
	   <script>
	   WebFontConfig = {
	      google: {
	        families: ['Open+Sans:400,700']
	      }
	   };
	   (function(d) {
	      var wf = d.createElement('script'), s = d.scripts[0];
	      wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js';
	      s.parentNode.insertBefore(wf, s);
	   })(document);
	</script>
	```
* optimized the images via grunt. I manually resized pizzeria.jpg, but optimized it with grunt like all the other images.
* inlined critical css

####Part 2: Optimize Frames per Second in pizza.html

Here are the optimizations I made:
* changePizzaSizes queries the pizza container once and calculates the pizza size once (with the findOutSizePx function, which improves the old determineDx) all before the loop.
* used requestAnimationFrame to decouple the scroll event and the updatePositons
* change querySelectorAll to getElementsByClassName for the mover class and put it outside of the updatePostions function
* phase numbers in updatePositions were calculated before the loop
* used transform translateX to move the background pizzas
* made a function called generateDynamicPizzas to generate dynamic number of background pizzas based on window size.  the domcontentloaded and window resize events use this function as an 
  event handler
* queried the movingPizzas1 just once, before the loop that adds pizzas to it initially


