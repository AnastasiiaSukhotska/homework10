
	class Slider{
		constructor(selector){

			this.selector=selector;
			this.timer=null;

		}
		init(){
			this.slider=document.querySelector(this.selector);
			this.wrapper=this.slider.querySelector('.slider__wrapper');
			this.arrowLeft=this.slider.querySelector('.slider__arrow-left');
			this.arrowRight=this.slider.querySelector('.slider__arrow-right');
			this.bindEvents();
		}
		bindEvents(){
			this.arrowRight.addEventListener('click', ()=>this.nextSlide(Slider.SLIDE_TIME));
			this.arrowLeft.addEventListener('click', ()=>this.previousSlide(Slider.SLIDE_TIME));
			

		}

		autoScroll(time){
			if(this.timer!==null) return;
			let frameCount=time/Slider.FRAME_TIME;
			let step = 100/frameCount;
			let currentPosition=0;
			scroll=setInterval(()=>{
				if (this.timer!==null){

					clearInterval(scroll);
					this.wrapper.style.marginLeft='';
				}
				else if (currentPosition<=-100){
					this.wrapper.append(this.wrapper.children[0]);
					currentPosition=0;
					this.wrapper.style.marginLeft='';
					return;
				}
				currentPosition-=step;
				this.wrapper.style.marginLeft=currentPosition+'%';

			}, Slider.FRAME_TIME);
		}


		nextSlide(time){
			if(this.timer!==null) return;
			let frameCount=time/Slider.FRAME_TIME;
			let step = 100/frameCount;
			let currentPosition=0;
			this.timer=setInterval(()=>{
				if (currentPosition<=-100){
					clearInterval(this.timer);
					this.timer=null;
					this.wrapper.append(this.wrapper.children[0]);
					this.wrapper.style.marginLeft='';
					this.autoScroll(Slider.AUTO_SLIDE_TIME);
					return;
				}
				currentPosition-=step;
				this.wrapper.style.marginLeft=currentPosition+'%';

			}, Slider.FRAME_TIME);
			
			}

			previousSlide(time){
				if(this.timer!==null) return;
			let frameCount=time/Slider.FRAME_TIME;
			let step = 100/frameCount;
			let currentPosition=-100;
			this.wrapper.prepend(this.wrapper.lastChild);

			this.timer=setInterval(()=>{
				if (currentPosition>=0){
					clearInterval(this.timer);
					this.timer=null;
					this.wrapper.style.marginLeft='';
					this.autoScroll(Slider.AUTO_SLIDE_TIME);
					return;
				}
				currentPosition+=step;
				this.wrapper.style.marginLeft=currentPosition+'%';
				

			}, Slider.FRAME_TIME);

			}
		}
		Slider.FRAME_TIME=50;
		Slider.SLIDE_TIME=5000;
		Slider.AUTO_SLIDE_TIME=10000;
		let scroll;
	



document.addEventListener('DOMContentLoaded', ()=>{
	let slider=new Slider('.slider');
	let sliderElement=document.querySelector('.slider');
	slider.init();
	slider.autoScroll(Slider.AUTO_SLIDE_TIME);
	sliderElement.addEventListener('mouseover', ()=>{
		clearInterval(scroll);
		slider.wrapper.style.marginLeft='';
		
		
	})
	sliderElement.addEventListener('mouseout', ()=>{
		slider.autoScroll(Slider.AUTO_SLIDE_TIME);
	})

})





