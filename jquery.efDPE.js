/*
	Copyright (c) 2014 - 2017 Edgar Fournival

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
*/

(function($) {
	$.fn.efDPE = function(options) {
		var parametres = {
			"afficherLegendes": true,
			"legendes": ["Logement économe", "Logement énergivore"],
			"afficherDescription": true,
			"intervalles": [50, 90, 150, 230, 330, 450],
			"categories": ["A", "B", "C", "D", "E", "F", "G"],
			"couleurs": ["#008837", "#4DAC27", "#B2DB11", "#FFFF00", "#FFB200", "#FF4D00", "#FF0000"],
			"debutLargeurLigne": 70,
			"incrementLargeurLigne": 30,
			"valeur": null
		};

		if (options) $.extend(parametres, options);

		return this.each(function(options) {
			var $this = $(this).empty().addClass("efDPE");

			if (!parametres.valeur) {
				parametres.valeur = $this.data("valeur");
			}

			var valeur = '<div class="efDPE-indicateur">' +
							'<div class="efDPE-valeur">' + parametres.valeur + '</div>' +
							'<div class="efDPE-triangle-inv"></div>' +
							'<div class="efDPE-barre" style="width: 60px;"></div>' +
							(parametres.afficherDescription ? '<div class="efDPE-description">kWh<sub>EP</sub>/m<sup>2</sup>.an</div>' : '') +
						'</div>';

			for(var i = 0; i < 7; i++) {
				var intervalle;
				var insValeur = false;

				if (i == 0) {
					intervalle = "&le; " + parametres.intervalles[i];
					insValeur = (parametres.valeur <= parametres.intervalles[i]);
				} else if (i == 6) {
					intervalle = "&gt; " + parametres.intervalles[5];
					insValeur = (parametres.valeur > parametres.intervalles[5]);
				} else {
					intervalle = (parametres.intervalles[i-1]+1) + " &agrave; " + parametres.intervalles[i];
					insValeur = (parametres.valeur >= (parametres.intervalles[i-1]+1) && parametres.valeur <= parametres.intervalles[i]);
				}

				$this.append('<div class="efDPE-ligne">' +
								'<div class="efDPE-intervalle">' + intervalle + '</div>' +
								'<div class="efDPE-barre" style="width: ' +
									(parametres.debutLargeurLigne + parametres.incrementLargeurLigne*i) + 'px; background-color: ' +
									parametres.couleurs[i] + ';">' +
									'<div class="efDPE-categorie">' + parametres.categories[i] + '</div>' +
								'</div>' +
								'<div class="efDPE-triangle" style="border-left-color: ' + parametres.couleurs[i] + ';"></div>' +
								(insValeur ? valeur : '') +
							 '</div>');
			}

			$this.append('<div class="efDPE-panneau-indicateur"></div>');

			if (parametres.afficherLegendes) {
				$this.prepend('<div class="efDPE-legende">' + parametres.legendes[0] + '</div>')
					 .append('<div class="efDPE-legende">' + parametres.legendes[1] + '</div>');
			}
		});
	};
})(jQuery);
