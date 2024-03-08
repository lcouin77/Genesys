const dxSupportBtnColor = document.currentScript.getAttribute('dxSupportBtnColor');
const dxSupportBtnBgColor = document.currentScript.getAttribute('dxSupportBtnBgColor');
const dxDeploymentId = document.currentScript.getAttribute('dxDeploymentId');
const dxScBrandHeroBackgroundColor = document.currentScript.getAttribute('dxScBrandHeroBackgroundColor');
const dxScBrandBackgroundColor = document.currentScript.getAttribute('dxScBrandBackgroundColor');
const dxScBrandColorMain = document.currentScript.getAttribute('dxScBrandColorMain');
const dxScBrandHeroTextColor = document.currentScript.getAttribute('dxScBrandHeroTextColor');
const dxScBrandColorText = document.currentScript.getAttribute('dxScBrandColorText');
const dxScBrandColorMainDark = document.currentScript.getAttribute('dxScBrandColorMainDark');
const dxScBrandColorMainLight = document.currentScript.getAttribute('dxScBrandColorMainLight');

var dxSupport = (function() {

    let css = `<style>        


    		#clustaar_webchat_launcher {
    			display: none!important;
    		}	


    		.font-normal, #genesys-support-center > main > div > div > div > div > div > div > div > input {
    			color: black!important;
    		}

			#dx-support-btn {
				width: 56px;
				height: 56px;
				border-radius: 56px;
				background-color: blue;
				color: white;
				border-width: 0;
				box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%);
				font-size: 32px;
				z-index: 999999;
				display: none;
			}

			#dx-support-btn.dx-show {
			    transform: scaleY(1);
			    transition: transform 400ms ease 0ms;
			}

			/* The Overlay (background) */
			.dx-overlay {
				/* Height & width depends on how you want to reveal the overlay (see JS below) */   
				height: 100%;
				width: 100%;
				position: fixed; /* Stay in place */
				z-index: 1; /* Sit on top */
				left: 0;
				top: 0;
				background-color1: rgb(0,0,0); /* Black fallback color */
				background-color: rgba(0,0,0, 0.4); /* Black w/opacity */
				overflow-x: hidden; /* Disable horizontal scroll */
				transition: 0.5s; /* 0.5 second transition effect to slide in or slide down the overlay (height or width, depending on reveal) */
				display:none;
				z-index: 999999;
			}

			/* Position the content inside the overlay */
				.dx-overlay-content {
				position: relative;
				top: 10%; /* 25% from the top */
				width: 80%; /* 100% width */
				text-align: center; /* Centered text/links */
				left:10%;
				height: 80%;
				min-height: 80%;
				margin-top: 30px; /* 30px top margin to avoid conflict with the close button on smaller screens */
				box-shadow: 10px 10px 5px #696969;
			}

			/* The navigation links inside the overlay */
			.closebtn {
				padding: 8px;
				text-decoration: none;
				font-size: 36px;
				color: #818181;
				display: block; /* Display block instead of inline */
				transition: 0.3s; /* Transition effects on hover (color) */
			}

			/* When you mouse over the navigation links, change their color */
			.closebtn:hover, .closebtn:focus {
				color: #f1f1f1;
			}


			/* Position the close button (top right corner) */
			.dx-overlay .closebtn {
					position: absolute;
					top: 20px;
					right: 45px;
					font-size: 60px;
				}

			/* When the height of the screen is less than 450 pixels, change the font-size of the links and position the close button again, so they don't overlap */
			@media screen and (max-height: 450px) {
				.dx-overlay a {font-size: 20px}
				.dx-overlay .closebtn {
				  font-size: 40px;
				  top: 15px;
				  right: 35px;
				}
			}
	    </style>`,
		ovl_html = `    
				<a href="javascript:void(0)" class="closebtn" onclick="dxSupport.closeNav()">&times;</a>
				<div class="dx-overlay-content" id="dx-overlay-content">
					<div style="overflow-y:auto; height:80vh;" id="genesys-support-center" class="genesys-support-center"></div>
				</div>
        `;


	let initMsg = function(){

		if (typeof Genesys === 'function') {
			let ovl = document.createElement("div");
			ovl.innerHTML = ovl_html;
			ovl.classList.add("dx-overlay"); 
			ovl.setAttribute("id", "myNav");
			document.body.appendChild(ovl);

			let btn = document.createElement("button");
			btn.setAttribute("href", "javascript:void(0)");
			btn.setAttribute("id", "dx-support-btn");
			btn.innerHTML = '?';
			btn.onclick = function(){dxSupport.onSupport();};
			document.body.appendChild(btn);
		
			document.head.insertAdjacentHTML("beforeend", css);
			let sup = document.getElementById("dx-support-btn");
			sup.style.position = 'fixed';
			sup.style.bottom = '85px';
			sup.style.right = '30px';
			sup.style.color = dxSupportBtnColor;
			sup.style["background-color"] = dxSupportBtnBgColor;
			sup.onclick = ()=>{
				//toggleSupport(0);
				openNav();
			};
			
			Genesys("subscribe", "Launcher.ready", function(){
				console.log('Messenger loaded!');

 
 				let ovl = document.getElementById("dx-overlay-content");
				let mainElement = document.getElementById("genesys-support-center").getElementsByTagName("main")[0];
				let tempColor = !!dxScBrandBackgroundColor ? dxScBrandBackgroundColor : mainElement.style.getPropertyValue('--brand-background-color');
				ovl.style["background-color"] = tempColor;

                if(!!dxScBrandBackgroundColor){
					mainElement.style.setProperty('--brand-background-color', dxScBrandBackgroundColor);
					ovl.style["background-color"] = tempColor;
				}

                if(!!dxScBrandHeroBackgroundColor){
					mainElement.style.setProperty('--brand-hero-background-color', dxScBrandHeroBackgroundColor);
				}

                if(!!dxScBrandColorMain){
					mainElement.style.setProperty('--brand-color-main', dxScBrandColorMain);
				}

                if(!!dxScBrandHeroTextColor){
					mainElement.style.setProperty('--brand-hero-text-color', dxScBrandHeroTextColor);
				}

                if(!!dxScBrandColorText){
					mainElement.style.setProperty('--brand-color-text', dxScBrandColorText);
				}

                if(!!dxScBrandColorMainDark){
					mainElement.style.setProperty('--brand-color-main-dark', dxScBrandColorMainDark);
				}

                if(!!dxScBrandColorMainLight){
					mainElement.style.setProperty('--brand-color-main-light', dxScBrandColorMainLight);
				}


				//let btn = document.getElementById("genesys-mxg-frame");
				//btn.addEventListener("mouseenter", function( event ) {
					toggleSupport(1);
				//	setTimeout(()=>{toggleSupport(0)}, 5000);
			//});
		});
	  }

	  else {
	      setTimeout(()=>{initMsg()}, 500);
	  }
	}

	let toggleSupport = function(flag){
		let sup = document.getElementById("dx-support-btn");
		let isOverlay = document.getElementById("myNav").style.display && document.getElementById("myNav").style.display !== 'none';
		let isSeen = sup.classList.contains('dx-show') ;
		if (flag == 0 && isSeen || flag == 1 && !isSeen && !isOverlay ) {
			sup.style.display = 'hidden';
			sup.classList.toggle('dx-show');
		}
	}

	let openNav = function() {
		console.log("openNav");
		if (typeof $_gxpData === 'object' && $_gxpData.appCfg.caller == 'Fregoli' && location.hash !== '#' ) {
			localStorage.setItem("gts_supportCenterHash", location.hash);
			location.hash = '#';
		}
		document.getElementById("myNav").style.display = "block";
	};

	let closeNav = function() {
		console.log("closeNav");
		if (typeof $_gxpData === 'object' && $_gxpData.appCfg.caller == 'Fregoli' && location.hash !== '#'  && localStorage.getItem("gts_supportCenterHash") ) {
			location.hash = localStorage.getItem("gts_supportCenterHash");
			localStorage.setItem("gts_supportCenterHash", '');
		}
		document.getElementById("myNav").style.display = "none";
	}

	let injectSearch = function(searchText) {
		let txtInput = $('#genesys-support-center > main > div > div > div > div > div > div > div > input');
		txtInput.focus().val(searchText);		
		let e = $.Event( "keydown" );
		e.which = 13;
		e.keyCode = 13;
		txtInput.trigger(e);
		$('#genesys-support-center > main > div > div > div > div > div > div > div > button')[0].click();		
	}

	return {
		injectSearch,
		initMsg,
		closeNav,
		openNav 
	};
})();

dxSupport.initMsg();

// for debugging in chrome:
//# sourceURL=support.js
