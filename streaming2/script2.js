// Esta função inicializa o slider quando a página é carregada ou redimensionada.
const initSlider = () => {
    // Seleciona os elementos necessários do DOM.
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    // Calcula o valor máximo que o slider pode ser rolado para a esquerda.
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
    
    // Adiciona um ouvinte de evento ao clicar e arrastar o polegar da barra de rolagem.
    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;
        const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;
        
        // Ouvinte de evento para o movimento do mouse durante o arrastar.
        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;
            
            // Limita a posição do polegar dentro dos limites da barra de rolagem.
            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            // Calcula a posição de rolagem correspondente ao movimento do polegar.
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;
            
            // Atualiza a posição do polegar e a posição de rolagem da imagem.
            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        }

        // Ouvinte de evento para soltar o mouse após o arrastar.
        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }

        // Adiciona ouvintes de eventos para o movimento e soltura do mouse.
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });

    // Adiciona ouvintes de eventos aos botões de navegação do slider.
    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Determina a direção do slide com base no botão clicado.
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            // Rola a imagem suavemente na direção determinada.
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    });

    // Esta função atualiza a visibilidade dos botões de navegação com base na posição de rolagem.
    const handleSlideButtons = () => {
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
    }

    // Esta função atualiza a posição do polegar da barra de rolagem com base na posição de rolagem da imagem.
    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    }

    // Adiciona um ouvinte de evento de rolagem à lista de imagens.
    imageList.addEventListener("scroll", () => {
        // Atualiza a posição do polegar e a visibilidade dos botões de navegação.
        updateScrollThumbPosition();
        handleSlideButtons();
    });
}

// Adiciona ouvintes de evento de redimensionamento e carregamento da janela para inicializar o slider.
window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);
