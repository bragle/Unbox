class Unbox {
	
	constructor () {

		this.loadedSources = {};

	}

	execute (callback) {

		if (
			callback &&
			callback.constructor &&
			callback.call &&
			callback.apply
		) {

			callback();

		}

	}

	load (source, callback) {

		this.loadedSources[source] = { ready: false, pool: [] };

		this.loadedSources[source].pool.push(callback);
		
		fetch(source, {

			credentials: 'include',
			method: 'GET'

		}).then(response => {

			response.text().then(data => {

				const script = document.createElement('script');
	
				script.text = data;
	
				document.getElementsByTagName('head')[0].appendChild(script);
	
				script.remove();
	
				this.loadedSources[source].ready = true;
	
				while (this.loadedSources[source].pool.length) {
	
					this.execute(this.loadedSources[source].pool.shift());
	
				}

			});

		});

	}

	require (source, callback) {

		if (this.loadedSources.hasOwnProperty(source)) {

			if(this.loadedSources[source].ready){

				this.execute(callback);

			}else{

				this.loadedSources[source].pool.push(callback);

			}

			return;

		}

		this.load(source, callback);

	}

	lazyRequire (sources) {

		!(sources instanceof Array) && (sources = [sources]);

		sources.forEach(source => {

			window.addEventListener('load', _ =>
				window.requestIdleCallback(_ =>
					!this.loadedSources.hasOwnProperty(source) && this.load(source)));

		});

	}

	loaded (sources) {

		let loaded = true;

		sources.every(source => {

			if(!this.loadedSources.hasOwnProperty(source)){

				loaded = false;

				return false;

			}

		});

		return loaded;

	}

}
