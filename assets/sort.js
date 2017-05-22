$(document).ready(function(){

	console.log('The original list in random order', numList);
	console.log('*********************************');


	function javascriptSort(numList) {

		return new Promise(function(resolve, reject) {
			const numbers = numList.slice(0); //get a copy so as to not change original array
			let iterations = 0;
			const start = Date.now(); //get start time

			function sortAndCount(a, b) {
				iterations++;
				return a-b;
			}

			numbers.sort(sortAndCount);

			const end = Date.now(); // get end time
			
			const timeElasped = end - start;

			resolve({iterations, timeElasped});

			//update console
			console.log('');
			console.log('Javascript Array Sort Method')
			console.log('Start time: ', start);
			console.log('End time : ', end);
			console.log('Time Elapsed: ', timeElasped, 'ms.');
			console.log('Total Comparisons: ', iterations);
			console.log('Sorted Array: ', numbers);
			console.log('________________________________');
		});
	}

	function bubbleSort(numList){

		return new Promise(function(resolve, reject) {
			const numbers = numList.slice(0); //get a copy so as to not change original array
			const length = numList.length;
			let iterations = 0;
			let start = Date.now(); //get start time

			//iterate through the array to the end
			for(let i=0; i<length; i++) {
				//iterate through the array to the end to compare pairs of values
				for(let j=1; j<length; j++) {
					iterations++;
					//check to see if pair of current index and previous index are in order, if not, switch
					if(numbers[j-1] > numbers[j]) {
						let temp = numbers[j-1]; //store one of the values in a temporary variable
						numbers[j-1] = numbers[j];
						numbers[j] = temp;
					}
				}
			}

			const end = Date.now(); // get end time
			
			const timeElasped = end - start;

			resolve({iterations, timeElasped});

			//update console
			console.log('');
			console.log('Basic Bubble Sort Method')
			console.log('Start time: ', start);
			console.log('End time : ', end);
			console.log('Time Elapsed: ', timeElasped, 'ms.');
			console.log('Total Comparisons: ', iterations);
			console.log('Sorted Array: ', numbers);
			console.log('________________________________');
		});
	}

	function optimizedBubbleSort(numList){

		return new Promise(function(resolve, reject) {
			const numbers = numList.slice(0); //get a copy so as to not change original array
			const length = numList.length;
			let iterations = 0;
			let start;

			function runNewSort() {
				start = Date.now(); //get start time
			//iterate through the array to the end
				for(let i=0; i<length; i++) {
					//iterate through the array to the end to compare pairs of values
					let isSorted = true;
					for(let j=1; j < length - i; j++) {
						iterations++;
						//check to see if pair of current index and previous index are in order, if not, switch
						if(numbers[j-1] > numbers[j]) {
							isSorted = false; //set flag to false indicating a switch was made

							let temp = numbers[j-1]; //store one of the values in a temporary variable
							numbers[j-1] = numbers[j];
							numbers[j] = temp;
						}

						if(j === (length - i - 1) && isSorted) {
							return; // stops function if loop iterates through array without swapping
						}
					}
				}
			}

			runNewSort();

			const end = Date.now(); // get end time
			
			const timeElasped = end - start;

			resolve({iterations, timeElasped});

			//update console
			console.log('');
			console.log('Optimized Bubble Sort Method')
			console.log('Start time: ', start);
			console.log('End time : ', end);
			console.log('Time Elapsed: ', timeElasped, 'ms.');
			console.log('Total Comparisons: ', iterations);
			console.log('Sorted Array: ', numbers);
			console.log('________________________________');
		});
	}

	function callPromises() {
		javascriptSort(numList).then(function(data){
			//update DOM
			$('.panel.basic-sort').show();
			$('.preloader').hide();
			$('.elapsed-time.basic-sort').html(`<p>Time: ${data.timeElasped}ms.</p>`);
			$('.iterations.basic-sort').html(`<p>Comparisons: ${data.iterations}.</p>`);
		});

		bubbleSort(numList).then(function(data){
			//update DOM
			$('.panel.bubble-sort').show();
			$('.elapsed-time.bubble-sort').html(`<p>Time: ${data.timeElasped}ms.</p>`);
			$('.iterations.bubble-sort').html(`<p>Comparisons: ${data.iterations}.</p>`);
		});

		optimizedBubbleSort(numList).then(function(data){
			//update DOM
			$('.panel.optimized-sort').show();
			$('.elapsed-time.optimized-sort').html(`<p>Time: ${data.timeElasped}ms.</p>`);
			$('.iterations.optimized-sort').html(`<p>Comparisons: ${data.iterations}.</p>`);
		});
	}

	$('button').on('click', function(){
		$('.verify').show();
		$('.preloader').show();
		$(this).addClass('disabled');
		setTimeout(callPromises, 50);
	});



});