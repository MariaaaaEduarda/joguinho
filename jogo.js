// Função para exibir uma mensagem e esperar a entrada do jogador
function exibirMensagem(mensagem) {
    alert(mensagem);
}

// Função para obter a entrada do jogador
function obterEntrada(textoPrompt) {
    return prompt(textoPrompt);
}

// Função principal do jogo
function jogar() {
    // Introdução ao jogo
    exibirMensagem("Bem-vindo ao jogo de Yekta Jamali Galeh! Você está ajudando uma jovem refugiada do Afeganistão a chegar a Paris para as Olimpíadas, para competir em levantamento de peso, que sempre foi seu sonho. Sua jornada será longa e cheia de desafios, mas a determinação e a empatia serão suas maiores aliadas.");

    let inventario = [];
    let empatia = 0;
    let vida = 100;
    let pontosDeControle = [false, false, false];
    let chegou = false;
    
    // Função para verificar o status
    function verificarStatus() {
        exibirMensagem(`Status Atual: Vida: ${vida}, Empatia: ${empatia}, Inventário: ${inventario.join(", ")}`);
    }

    // Função para encontrar um NPC
    function encontrarNPC(nome, empatiaNecessaria, item, recompensaEmpatia, itemNecessario) {
        exibirMensagem(`Você encontrou ${nome}, um local que está passando por dificuldades e pode ajudar em sua jornada. No entanto, ${nome} precisa ver sua empatia ou um item especial para oferecer assistência.`);
        let escolha = obterEntrada("1. Falar com o NPC\n2. Ignorar e seguir em frente");
        
        if (escolha === "1") {
            if (empatia >= empatiaNecessaria) {
                exibirMensagem(`${nome} está visivelmente aliviado e decide ajudar você. Ele lhe oferece ${item} como um presente.`);
                if (item) {
                    exibirMensagem(`Você recebeu um ${item}. Isso pode ser muito útil para os desafios futuros que enfrentará.`);
                    inventario.push(item);
                }
                empatia += recompensaEmpatia; // Aumenta a empatia
            } else if (inventario.includes(itemNecessario)) {
                exibirMensagem(`${nome} olha para o ${itemNecessario} e parece mais disposto a ajudar. Ele lhe dá ${item} em troca.`);
                inventario.push(item);
                empatia += recompensaEmpatia; // Aumenta a empatia
            } else {
                exibirMensagem(`${nome} não parece satisfeito e você percebe que precisará de mais empatia ou do item especial para receber ajuda.`);
            }
            verificarStatus(); // Mostrar status após interação com NPC
        } else if (escolha === "2") {
            exibirMensagem(`Você decide seguir em frente sem a ajuda de ${nome}. Embora a decisão possa atrasá-lo, você se mantém determinado a completar sua jornada.`);
        } else {
            exibirMensagem("Escolha inválida. Você perde algum tempo tentando decidir e se sente um pouco frustrado.");
            vida -= 10;
            verificarStatus(); // Mostrar status após escolha inválida
        }
    }

    // Função para enfrentar um desafio
    function enfrentarDesafio(nomeDesafio, chanceSucesso, impactoVida, interativo) {
        exibirMensagem(`Você se depara com o desafio: ${nomeDesafio}. Este desafio é uma prova importante e poderá testar suas habilidades e recursos.`);
        let escolha = obterEntrada("1. Tentar resolver o desafio\n2. Evitar o desafio");
        
        if (escolha === "1") {
            if (interativo) {
                exibirMensagem(`Para superar o desafio, você precisa fazer uma escolha cuidadosa entre as opções disponíveis.`);
                let resultado = obterEntrada("Escolha uma opção para superar o desafio. Digite um número de 1 a 3:");
                let opcaoCorreta = Math.floor(Math.random() * 3) + 1; // Opção correta aleatória
                
                if (parseInt(resultado) === opcaoCorreta) {
                    exibirMensagem(`Você escolheu corretamente e conseguiu superar o desafio: ${nomeDesafio}. Sua bravura foi recompensada.`);
                    empatia += 3;
                } else {
                    exibirMensagem(`Você escolheu incorretamente e falhou no desafio: ${nomeDesafio}. O revés foi difícil e você perdeu um pouco de vida.`);
                    vida -= impactoVida;
                }
            } else {
                let sucesso = Math.random() < chanceSucesso; // Chance de sucesso
                if (sucesso) {
                    exibirMensagem(`Você teve sucesso em superar o desafio: ${nomeDesafio}. Sua persistência ajudou a superar essa dificuldade.`);
                    empatia += 3;
                } else {
                    exibirMensagem(`Infelizmente, você falhou no desafio: ${nomeDesafio}. A dificuldade foi grande e sua saúde foi afetada.`);
                    vida -= impactoVida;
                }
            }
            verificarStatus(); // Mostrar status após desafio
        } else if (escolha === "2") {
            exibirMensagem(`Você decide evitar o desafio: ${nomeDesafio}. Embora tenha conseguido evitar o problema imediato, isso causou um atraso na sua jornada.`);
            vida -= 10;
            verificarStatus(); // Mostrar status após evitar o desafio
        } else {
            exibirMensagem("Escolha inválida. Você perde algum tempo tentando decidir e a jornada se torna um pouco mais difícil.");
            vida -= 10;
            verificarStatus(); // Mostrar status após escolha inválida
        }
    }

    // Função para lidar com itens coletados
    function coletarItem(item) {
        if (!inventario.includes(item)) {
            inventario.push(item);
            exibirMensagem(`Você encontrou um ${item} enquanto explorava. Este item pode ser crucial para enfrentar os desafios que estão por vir.`);
            verificarStatus(); // Mostrar status após coletar item
        } else {
            exibirMensagem(`Você já tem um ${item} no seu inventário. Talvez possa usá-lo mais tarde.`);
        }
    }

    // Função para usar itens do inventário
    function usarItem(item) {
        if (inventario.includes(item)) {
            if (item === "Maçã") {
                vida = Math.min(vida + 20, 100);
                exibirMensagem("Você comeu uma maçã fresca. Sua saúde melhorou um pouco, e você se sente revitalizado.");
                inventario = inventario.filter(i => i !== item); // Remove a maçã do inventário
            } else if (item === "Água") {
                vida = Math.min(vida + 10, 100);
                exibirMensagem("Você bebeu água e se sente um pouco melhor. A hidratação ajudou a restaurar sua energia.");
                inventario = inventario.filter(i => i !== item); // Remove a água do inventário
            } else if (item === "Kit de Primeiros Socorros") {
                vida = Math.min(vida + 30, 100);
                exibirMensagem("Você utilizou um kit de primeiros socorros e está se sentindo muito melhor. Seu corpo se recuperou de forma significativa.");
                inventario = inventario.filter(i => i !== item); // Remove o kit do inventário
            } else if (item === "Roupas de Frio") {
                exibirMensagem("Você veste as roupas de frio que encontrou. Isso ajudará a manter seu conforto em condições geladas e pode reduzir o impacto de desafios relacionados ao frio.");
                // Pode ter outros efeitos, como reduzir impacto de desafios em clima frio
            } else if (item === "Cesta de Frutas") {
                exibirMensagem("Você compartilha a cesta de frutas com pessoas ao longo do caminho. Sua generosidade é notada e você ganha empatia por isso.");
                empatia += 5;
                inventario = inventario.filter(i => i !== item); // Remove a cesta do inventário
            } else if (item === "Mapa de Paris") {
                exibirMensagem("Você estuda o mapa de Paris e descobre rotas mais seguras e rápidas para o seu destino. Isso pode ajudar a evitar alguns desafios.");
                // Esse item pode ter outros efeitos, como ajudar a evitar desafios
            } else if (item === "Bilhete para o Trem") {
                exibirMensagem("Você usa o bilhete para o trem para acelerar sua viagem até Paris. A viagem se torna muito mais rápida e você avança rapidamente.");
                // Esse item pode ter outros efeitos, como ajudar a evitar desafios
            } else {
                exibirMensagem(`Você não pode usar o item ${item} agora. Talvez seja útil em outra parte da sua jornada.`);
            }
            verificarStatus(); // Mostrar status após usar item
        } else {
            exibirMensagem(`Você não tem o item ${item} no inventário. Verifique seus itens novamente para garantir que possui o que precisa.`);
        }
    }

    // Função para salvar o checkpoint
    function pontoDeControle(etapa) {
        if (etapa === 1 && !pontosDeControle[0]) {
            pontosDeControle[0] = true;
            exibirMensagem("Você chegou a um ponto de controle na Turquia, onde encontra um abrigo seguro. Sua vida foi restaurada parcialmente devido ao descanso e ao apoio encontrado aqui.");
            vida = Math.min(vida + 30, 100); // Restaura parte da vida, não excede 100
        } else if (etapa === 2 && !pontosDeControle[1]) {
            pontosDeControle[1] = true;
            exibirMensagem("Você chegou a um ponto de controle na Itália, onde um grupo de pessoas solidárias ofereceu ajuda. Sua vida foi restaurada parcialmente devido ao conforto e ao apoio recebido.");
            vida = Math.min(vida + 30, 100); // Restaura parte da vida, não excede 100
        } else if (etapa === 3 && !pontosDeControle[2]) {
            pontosDeControle[2] = true;
            exibirMensagem("Você chegou a um ponto de controle na França, próximo ao seu destino. O esforço e a determinação ajudaram a restaurar parte da sua vida, trazendo esperança para a etapa final.");
            vida = Math.min(vida + 30, 100); // Restaura parte da vida, não excede 100
        } else {
            exibirMensagem("Você já passou por este ponto de controle. Continue avançando em sua jornada.");
        }
        verificarStatus(); // Mostrar status após checkpoint
    }

    // Introdução da história
    exibirMensagem("Yekta Jamali Galeh é uma jovem atleta com um sonho grande: participar das Olimpíadas em Paris. Ela enfrenta desafios imensos, mas sua determinação e coragem são suas maiores forças. Em sua jornada, você ajudará Yekta a superar obstáculos e encontrar seu caminho até Paris.");

    // Jornada da Yekta
    exibirMensagem("Sua jornada começa na Turquia. Você está em uma cidade movimentada, repleta de pessoas e oportunidades. Sua primeira tarefa é encontrar um meio de transporte para avançar para a Europa.");

    // Encontros e desafios
    exibirMensagem("Enquanto explora a Turquia, você encontra o NPC Ali. Ali é um homem que entende bem a dificuldade de viajar e pode oferecer assistência para sua jornada.");
    encontrarNPC("Ali", 5, "Passagem de Trem", 2, "Cesta de Frutas");
    enfrentarDesafio("Cruzar a Fronteira", 0.6, 20, true); // Desafio interativo
    coletarItem("Maçã"); // Coleta de item
    coletarItem("Água"); // Coleta de item
    pontoDeControle(1); // Chegada ao primeiro checkpoint
    
    exibirMensagem("Você agora está na Itália. A viagem até aqui foi cheia de desafios e obstáculos. A Itália é um lugar vibrante, mas também apresenta novos desafios que você precisará enfrentar.");

    encontrarNPC("Giulia", 7, "Mapa da Cidade", 3, "Água");
    enfrentarDesafio("Sobrevivendo ao Mercado de Rua", 0.5, 25, true); // Desafio interativo
    coletarItem("Kit de Primeiros Socorros"); // Coleta de item
    coletarItem("Roupas de Frio"); // Coleta de item adicional
    pontoDeControle(2); // Chegada ao segundo checkpoint
    
    exibirMensagem("Finalmente, você chegou à França. Você está muito perto de seu destino final, Paris. No entanto, ainda há um último obstáculo a ser superado antes de alcançar seu sonho.");

    encontrarNPC("Jean", 10, "Bilhete para o Trem", 4, "Kit de Primeiros Socorros");
    enfrentarDesafio("Atravessar a França", 0.4, 30, true); // Desafio interativo
    coletarItem("Cesta de Frutas"); // Coleta de item adicional
    pontoDeControle(3); // Chegada ao terceiro checkpoint
    
    // Decisão final
    exibirMensagem("Você está agora em Paris. A cidade está ao seu alcance e as Olimpíadas estão quase começando. É hora de tomar uma decisão final sobre como avançar até o grande evento.");
    let escolhaFinal = obterEntrada("1. Acelerar para chegar às Olimpíadas rapidamente\n2. Descansar antes de continuar");
    
    if (escolhaFinal === "1") {
        if (inventario.includes("Bilhete para o Trem")) {
            exibirMensagem("Você usa o bilhete para o trem e a viagem se torna rápida e tranquila. Paris está agora ao seu alcance, e você se aproxima do seu sonho com mais confiança.");
            chegou = true;
        } else {
            exibirMensagem("Sem o bilhete para o trem, a viagem se torna difícil e você enfrenta diversos desafios ao longo do caminho. A jornada se torna mais cansativa e sua saúde é afetada.");
            vida -= 30;
        }
    } else if (escolhaFinal === "2") {
        exibirMensagem("Você decide tirar um momento para descansar e recuperar suas energias. O descanso traz alívio e você está pronto para a etapa final de sua jornada.");
        vida = Math.min(vida + 20, 100);
    } else {
        exibirMensagem("Escolha inválida. Você perde algum tempo tentando decidir e sua saúde é impactada devido ao atraso.");
        vida -= 10;
    }
    
    // Final do jogo
    if (chegou) {
        exibirMensagem("Parabéns! Você chegou às Olimpíadas em Paris. Sua determinação, coragem e perseverança fizeram com que você realizasse seu sonho. Você representa seu país com orgulho e conquistou seu objetivo.");
    } else {
        exibirMensagem("Infelizmente, sua jornada não chegou ao fim desejado. Apesar das dificuldades e desafios, sua luta foi admirável. Continue acreditando em seus sonhos e tente novamente no futuro. Melhor sorte da próxima vez.");
    }
}

// Iniciar o jogo
jogar();
