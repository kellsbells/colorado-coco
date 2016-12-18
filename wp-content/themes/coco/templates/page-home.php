<?php
/**
 * Template Name: Home
 *
 * @package coco
 */

$imagedir = get_stylesheet_directory_uri() . "/assets/img";
$custom_meta = get_post_meta( get_the_ID() );

function get_safe_meta( $key ) {
	global $custom_meta;
	return ( isset( $custom_meta[ $key ] ) && isset( $custom_meta[ $key ][0] ))
	? $custom_meta[ $key ][0]
	: "";
}

get_header();

?>

<?php 
echo do_shortcode( '[vCitaMeetingScheduler type=scheduler width=500 height=450]' );
?>

<div class="home">
	
	<section id="hero" class="hero">
		<div>
			<div class="container">
				<h1>Kellee Martins</h1>
				<h2>Web Developer</h2>
				<div class="social-icons">
					<a href="https://github.com/kellsbells" target="_blank"> 
						<img src="<?php echo $imagedir ?>/icons/github.png">
					</a>
					<a href="http://instagram.com/kelleebutton/" target="_blank">
						<img src="<?php echo $imagedir ?>/icons/instagram.png">
					</a>
					<a href="https://www.linkedin.com/in/kelleemartins" target="_blank">
						<img src="<?php echo $imagedir ?>/icons/linkedin.png">
					</a>
					<a href="https://twitter.com/kelleebutton" target="_blank">
						<img src="<?php echo $imagedir ?>/icons/twitter.png">
					</a>
					<a href="https://www.facebook.com/kelleedawn" target="_blank">
						<img src="<?php echo $imagedir ?>/icons/facebook.png">
					</a>
					<a href="https://www.pinterest.com/kelleemartins/" target="_blank">
						<img src="<?php echo $imagedir ?>/icons/pinterest.png">
					</a>
					<a href="https://plus.google.com/u/0/114655936823227127569" target="_blank">
						<img src="<?php echo $imagedir ?>/icons/google-plus.png">
					</a>
				</div>
			</div>
		</div>
	</section>

	<section id="company" class="company">
	</section>

	<section id="services" class="services">
	</section>

	<section id="about" class="about">
		<div>
			<div class="container">
				<h2>About Me</h2>
				<div class="imagetext">
					<img src="<?php echo $imagedir ?>/kellee.jpg" class="image">
					<div class="text">
						<p>Hi! My name is Kellee. I'm so excited that you're here on my site! I am so passionate about what I do! If there's one thing I could convey on my portfolio it's that I truly love to code. I live to solve problems and build beautiful things. Web development allows me to touch the lives of people around the world, I just love that! I still have so much to learn, and always will, as I become the best web developer I can be. But if you're looking for someone who will work hard and have a positve attitude you've come to the right place.</p>
					</div>
				</div>
				<a href="/about" class="button">Read More</a>
			</div>
		</div>
	</section>
	
	<section id="store" class="store"></section>
	
</div>

<?php get_footer();