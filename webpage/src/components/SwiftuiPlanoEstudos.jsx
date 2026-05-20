import { useState } from "react";

const MODULES = [
  {
    id:1, title:"Fundamentos do SwiftUI", color:"#FF6B35", icon:"🧱",
    exercises:[
      {id:1,title:"Hello, SwiftUI!",concept:"Views e Texto",
       theory:["Em SwiftUI, tudo é uma View. A struct que conforma o protocolo View deve implementar a propriedade body. O Text é a view mais básica para exibir texto na tela.","Conceitos-chave: Text, .font(), .foregroundColor(), .padding(). Modificadores são encadeados diretamente na view e a ordem importa."],
       code:"struct ContentView: View {\n    var body: some View {\n        Text(\"Olá, SwiftUI!\")\n            .font(.largeTitle)\n            .foregroundColor(.blue)\n            .padding()\n    }\n}",
       task:"Crie uma view com seu nome em fonte .title e cor laranja. Adicione um segundo Text com sua profissão em .subheadline e cor cinza abaixo.",
       tip:"Use .foregroundColor(.orange) e .padding(20) como modificadores encadeados na mesma view."},
      {id:2,title:"VStack, HStack, ZStack",concept:"Layout com Stacks",
       theory:["Stacks são containers de layout que organizam views em diferentes direções. VStack: vertical. HStack: horizontal. ZStack: profundidade (sobreposição).","Use Spacer() para empurrar views. Os parâmetros alignment e spacing controlam o posicionamento. Stacks podem ser aninhadas livremente."],
       code:"VStack(alignment: .leading, spacing: 12) {\n    HStack {\n        Image(systemName: \"person.circle\")\n            .font(.largeTitle)\n        VStack(alignment: .leading) {\n            Text(\"João Silva\").font(.headline)\n            Text(\"iOS Dev\").font(.caption)\n        }\n        Spacer()\n    }\n    Divider()\n    Text(\"Bem-vindo!\")\n}\n.padding()",
       task:"Crie um card de perfil com ZStack como base (fundo colorido), VStack interno com avatar SF Symbol, nome e bio. Use HStack para linha de ícones sociais na parte inferior.",
       tip:"ZStack é ótimo para sobreposições. Coloque um RoundedRectangle como fundo e a VStack sobre ele dentro do ZStack."},
      {id:3,title:"Imagens e SF Symbols",concept:"Image View",
       theory:["SwiftUI tem integração nativa com os mais de 5.000 ícones do SF Symbols. Use Image(systemName:) para símbolos e Image('nome') para assets do projeto.","Modificadores importantes: .resizable(), .scaledToFit(), .scaledToFill(), .frame(), .imageScale(.large), .symbolRenderingMode(.multicolor)."],
       code:"HStack(spacing: 20) {\n    Image(systemName: \"heart.fill\")\n        .foregroundColor(.red)\n        .font(.title)\n    Image(systemName: \"star.fill\")\n        .foregroundColor(.yellow)\n        .imageScale(.large)\n    Image(systemName: \"checkmark.circle.fill\")\n        .symbolRenderingMode(.multicolor)\n        .font(.title)\n}",
       task:"Crie uma barra de abas customizada com 4 SF Symbols (casa, lupa, sino, pessoa). Use VStack para empilhar ícone + label em cada item. Destaque o item ativo com cor diferente.",
       tip:"Explore o app SF Symbols da Apple para encontrar os nomes exatos. Exemplos: house.fill, magnifyingglass, bell, person.fill."},
      {id:4,title:"Botões e Ações",concept:"Button e Actions",
       theory:["Button é a view interativa fundamental em SwiftUI. Recebe uma closure de ação e um label que pode ser qualquer View.","Estilos nativos: .buttonStyle(.plain), .bordered, .borderedProminent, .borderless. O Label combina ícone SF Symbol e texto automaticamente com formatação consistente."],
       code:"VStack(spacing: 16) {\n    Button(\"Botão Padrão\") {\n        print(\"Tapped!\")\n    }\n    Button(action: { print(\"Custom!\") }) {\n        Label(\"Salvar\", systemImage: \"square.and.arrow.down\")\n            .padding(.horizontal, 20)\n            .padding(.vertical, 10)\n            .background(.blue)\n            .foregroundColor(.white)\n            .cornerRadius(10)\n    }\n}",
       task:"Crie a UI de uma calculadora: botões numéricos (0–9) em grid usando VStack + HStack, botões de operação (+, -, *, /) à direita, display no topo mostrando o número atual.",
       tip:"Use um HStack externo dividindo: VStack de HStacks para o grid numérico à esquerda, e VStack de operadores à direita."},
      {id:5,title:"Modificadores Essenciais",concept:"View Modifiers",
       theory:["Modificadores são métodos que retornam uma nova view modificada. A ORDEM importa: Text('A').padding().background(.blue) cria padding colorido; Text('A').background(.blue).padding() cria padding transparente.","Principais: .frame(), .background(), .clipShape(), .cornerRadius(), .shadow(), .opacity(), .overlay(alignment:)."],
       code:"Text(\"Card de Destaque\")\n    .font(.headline)\n    .foregroundColor(.white)\n    .padding()\n    .frame(maxWidth: .infinity)\n    .background(\n        LinearGradient(\n            colors: [.blue, .purple],\n            startPoint: .leading,\n            endPoint: .trailing\n        )\n    )\n    .clipShape(RoundedRectangle(cornerRadius: 16))\n    .shadow(color: .blue.opacity(0.4), radius: 8)\n    .padding(.horizontal)",
       task:"Crie uma galeria de 4 cards com gradientes diferentes. Cada card deve ter: ícone SF Symbol grande ao centro, título, e badge colorido no canto superior direito via .overlay(alignment: .topTrailing).",
       tip:"Use .overlay(alignment: .topTrailing) { BadgeView() } para posicionar o badge exatamente no canto superior direito do card."},
      {id:6,title:"Cores e Gradientes",concept:"Color e Gradient",
       theory:["SwiftUI oferece sistema de cores adaptativo com Dark Mode automático. Cores do sistema (.primary, .secondary) se ajustam automaticamente ao tema.","Tipos de gradiente: LinearGradient (direcional), RadialGradient (circular), AngularGradient (cônico). Use .ignoresSafeArea() para fundo que cobre toda a tela incluindo notch e barra de status."],
       code:"ZStack {\n    LinearGradient(\n        colors: [.indigo, .cyan],\n        startPoint: .topLeading,\n        endPoint: .bottomTrailing\n    )\n    .ignoresSafeArea()\n    VStack(spacing: 16) {\n        Image(systemName: \"swift\")\n            .font(.system(size: 80))\n            .foregroundStyle(.white)\n        Text(\"Meu App\")\n            .font(.largeTitle.bold())\n            .foregroundStyle(.white)\n    }\n}",
       task:"Crie uma splash screen do seu app fictício: gradiente radial como fundo, logo centralizado (SF Symbol grande), nome do app em fonte grande, e tagline menor. Aplique .ignoresSafeArea() no gradiente.",
       tip:".foregroundStyle(.white) é mais moderno que .foregroundColor(.white) no iOS 17+. Ambos funcionam, mas .foregroundStyle suporta gradientes e outros estilos."},
    ]
  },
  {
    id:2, title:"Estado e Interatividade", color:"#4ECDC4", icon:"⚡",
    exercises:[
      {id:7,title:"@State: Estado Local",concept:"@State Property Wrapper",
       theory:["@State é o mecanismo fundamental de estado em SwiftUI. Quando um @State muda, a view é re-renderizada automaticamente e de forma eficiente.","Regras: use para dados locais simples (Bool, Int, String). Declare como private. O prefixo $ cria um Binding para passar o estado para views filhas. SwiftUI gerencia o armazenamento, não é uma variável comum."],
       code:"struct ContadorView: View {\n    @State private var contador = 0\n    @State private var estaAtivo = false\n    \n    var body: some View {\n        VStack(spacing: 20) {\n            Text(\"\\(contador)\")\n                .font(.system(size: 72, weight: .bold))\n                .foregroundColor(estaAtivo ? .green : .primary)\n            HStack {\n                Button(\"-\") { contador -= 1 }.font(.title)\n                Button(\"+\") { contador += 1 }.font(.title)\n            }\n            Toggle(\"Modo Ativo\", isOn: $estaAtivo)\n                .padding()\n        }\n    }\n}",
       task:"Crie um app de flashcards: card com frente/verso que vira ao tocar usando @State. Adicione botões Acertei/Errei e um placar mostrando acertos e erros.",
       tip:"Use .rotation3DEffect(.degrees(isFlipped ? 180 : 0), axis: (x: 0, y: 1, z: 0)) para animar a virada do card de forma realista."},
      {id:8,title:"TextField e Formulários",concept:"TextField, SecureField, Form",
       theory:["Campos de texto com binding automático ao @State. O $ prefix conecta o TextField ao estado da view.","TextField para texto normal, SecureField para senha (oculta digitação), TextEditor para texto multiline. Form cria o visual de configurações/settings do iOS. Modificadores úteis: .keyboardType(), .textContentType(), .autocorrectionDisabled()."],
       code:"struct LoginView: View {\n    @State private var email = \"\"\n    @State private var senha = \"\"\n    \n    var body: some View {\n        Form {\n            Section(\"Credenciais\") {\n                TextField(\"Email\", text: $email)\n                    .keyboardType(.emailAddress)\n                    .autocorrectionDisabled()\n                SecureField(\"Senha\", text: $senha)\n            }\n            Section {\n                Button(\"Entrar\") { print(email) }\n                    .frame(maxWidth: .infinity)\n                    .buttonStyle(.borderedProminent)\n            }\n        }\n        .navigationTitle(\"Login\")\n    }\n}",
       task:"Crie formulário de cadastro com: nome, email, senha, confirmar senha, DatePicker de nascimento e Picker de país. Valide em tempo real se as senhas coincidem e mostre texto vermelho quando divergirem.",
       tip:"Use Form com múltiplas Section para organizar campos relacionados. DatePicker usa um binding de tipo Date. Computed var para validação: var senhasIguais: Bool { senha == confirmar }."},
      {id:9,title:"Picker, Toggle, Slider",concept:"Controls de Seleção",
       theory:["SwiftUI tem controles nativos adaptativos. Toggle para Bool. Slider(value: in:) para valores numéricos em range. Stepper para incremento/decremento. DatePicker para data e hora.","Picker tem vários estilos: .segmented (tabs), .wheel (roda iOS), .menu (dropdown), .navigationLink (abre tela). Use .pickerStyle() para definir. Todos usam binding com $variavel."],
       code:"struct ConfigView: View {\n    @State private var brilho = 0.5\n    @State private var modoEscuro = false\n    @State private var idioma = \"Português\"\n    let idiomas = [\"Português\", \"English\", \"Español\"]\n    \n    var body: some View {\n        Form {\n            Section(\"Aparência\") {\n                Toggle(\"Modo Escuro\", isOn: $modoEscuro)\n                Slider(value: $brilho, in: 0...1)\n            }\n            Section(\"Idioma\") {\n                Picker(\"Idioma\", selection: $idioma) {\n                    ForEach(idiomas, id: \\.self) { Text($0) }\n                }\n            }\n        }\n    }\n}",
       task:"Crie tela de configurações de notificações: Toggle para ativar/desativar tudo, Picker de frequência (Nunca/Diário/Semanal), Slider de horário preferido (0–23h), Stepper para limite de notificações por dia.",
       tip:"Use .disabled(!notificacoesAtivas) nos controles dependentes para desabilitá-los visualmente quando o Toggle principal estiver desligado."},
      {id:10,title:"Animações Básicas",concept:"Animation e Transition",
       theory:["SwiftUI simplifica animações com withAnimation e o modificador .animation(). Você anima mudanças de @State, não a animação em si — SwiftUI interpola automaticamente.","Implícita: .animation(.easeInOut, value: state) anima qualquer mudança naquele valor. Explícita: withAnimation(.spring()) { state.toggle() } controla exatamente o que é animado. Tipos: .linear, .easeIn/Out, .spring(), .bouncy, .interpolatingSpring()."],
       code:"struct AnimacaoView: View {\n    @State private var expandido = false\n    \n    var body: some View {\n        VStack(spacing: 24) {\n            RoundedRectangle(cornerRadius: 20)\n                .fill(.blue.gradient)\n                .frame(\n                    width: expandido ? 280 : 100,\n                    height: expandido ? 180 : 100\n                )\n                .animation(.spring(response: 0.5, dampingFraction: 0.6),\n                           value: expandido)\n            \n            Button(\"Animar!\") {\n                withAnimation(.bouncy) { expandido.toggle() }\n            }\n            .buttonStyle(.borderedProminent)\n        }\n    }\n}",
       task:"Crie um app de respiração guiada: círculo que expande e contrai em loop contínuo (.repeatForever(autoreverses: true)), texto alternando entre Inspire e Expire, e cronômetro de sessão.",
       tip:"Use .onAppear { withAnimation(.linear(duration: 4).repeatForever(autoreverses: true)) { expandido = true } } para iniciar a animação ao aparecer na tela."},
      {id:11,title:"Alerts e Sheets",concept:"Apresentação de Views",
       theory:["Apresentação modal são fundamentais. .alert() para confirmações e avisos. .sheet() para conteúdo modal que sobe de baixo. .fullScreenCover() para modais em tela cheia. .confirmationDialog() para action sheets.","Use .presentationDetents([.medium, .large]) no conteúdo do Sheet para controlar a altura inicial. O padrão do estado Boolean $showSheet controla abertura e fechamento."],
       code:"struct ConteudoView: View {\n    @State private var mostrarSheet = false\n    @State private var mostrarAlerta = false\n    \n    var body: some View {\n        VStack(spacing: 20) {\n            Button(\"Abrir Sheet\") { mostrarSheet = true }\n                .buttonStyle(.borderedProminent)\n            Button(\"Deletar\") { mostrarAlerta = true }\n                .foregroundColor(.red)\n        }\n        .sheet(isPresented: $mostrarSheet) {\n            Text(\"Conteúdo da Sheet\")\n                .presentationDetents([.medium, .large])\n        }\n        .alert(\"Confirmar Exclusão\", isPresented: $mostrarAlerta) {\n            Button(\"Deletar\", role: .destructive) { }\n            Button(\"Cancelar\", role: .cancel) { }\n        } message: { Text(\"Esta ação não pode ser desfeita.\") }\n    }\n}",
       task:"Crie um gerenciador de tarefas: botão + que abre Sheet para adicionar tarefa com TextField e botão confirmar, swipe para deletar com Alert de confirmação, contador de tarefas pendentes.",
       tip:".presentationDetents([.medium]) faz o Sheet abrir na metade da tela como um drawer — ótimo para formulários rápidos. O usuário pode puxar para cima para expandir."},
      {id:12,title:"Listas Dinâmicas",concept:"List e ForEach",
       theory:["List é uma das views mais poderosas do SwiftUI, renderizando dados de forma eficiente com scroll automático.","ForEach requer id: ou tipo Identifiable. Recursos nativos: .listStyle(.plain/.grouped/.insetGrouped), .swipeActions() para ações de swipe, .refreshable { } para pull-to-refresh, Section('Título') para agrupamento."],
       code:"struct Tarefa: Identifiable {\n    let id = UUID()\n    var titulo: String\n    var concluida = false\n}\n\nstruct ListaView: View {\n    @State private var tarefas = [\n        Tarefa(titulo: \"Estudar SwiftUI\"),\n        Tarefa(titulo: \"Fazer exercícios\")\n    ]\n    \n    var body: some View {\n        List {\n            ForEach($tarefas) { $tarefa in\n                HStack {\n                    Image(systemName: tarefa.concluida\n                          ? \"checkmark.circle.fill\" : \"circle\")\n                        .foregroundColor(tarefa.concluida ? .green : .gray)\n                    Text(tarefa.titulo)\n                        .strikethrough(tarefa.concluida)\n                }\n                .onTapGesture { tarefa.concluida.toggle() }\n            }\n        }\n    }\n}",
       task:"Crie app de lista de compras com seções por categoria (Frutas, Laticínios, Bebidas). Items com checkbox, swipe para deletar, Sheet para adicionar item com seleção de categoria, badge com total de items.",
       tip:"Use um Dictionary<String, [Item]> agrupando items por categoria, depois itere com ForEach nas chaves para criar cada Section."},
    ]
  },
  {
    id:3, title:"Navegação e Arquitetura", color:"#A855F7", icon:"🗺️",
    exercises:[
      {id:13,title:"NavigationStack",concept:"Navegação em Pilha",
       theory:["NavigationStack (iOS 16+) gerencia uma pilha de views com navegação push/pop e suporte a deep linking.","NavigationLink empurra uma view na pilha ao tocar. .navigationTitle() define o título da barra. .toolbar { ToolbarItem(placement:) } adiciona botões. Navegação programática com NavigationStack(path: $caminho) e .navigationDestination(for:)."],
       code:"struct AppRoot: View {\n    var body: some View {\n        NavigationStack {\n            List(1...10, id: \\.self) { numero in\n                NavigationLink(\"Item \\(numero)\") {\n                    DetalheView(numero: numero)\n                }\n            }\n            .navigationTitle(\"Minha Lista\")\n            .toolbar {\n                ToolbarItem(placement: .topBarTrailing) {\n                    Button(\"Adicionar\") { }\n                }\n            }\n        }\n    }\n}\n\nstruct DetalheView: View {\n    let numero: Int\n    var body: some View {\n        Text(\"Detalhe \\(numero)\")\n            .navigationTitle(\"Item \\(numero)\")\n            .navigationBarTitleDisplayMode(.inline)\n    }\n}",
       task:"Crie app de países: lista com bandeira emoji, nome e continente. Ao tocar, tela de detalhe com bandeira grande, capital, população, moeda e botão Favoritar na toolbar.",
       tip:"Crie struct Pais: Hashable com todos os dados e use NavigationLink(value: pais) com .navigationDestination(for: Pais.self) para navegação type-safe moderna."},
      {id:14,title:"TabView",concept:"Navegação por Abas",
       theory:["TabView cria a barra de abas característica dos apps iOS. Cada aba recebe um .tabItem { } com Label ou imagem e texto separados.","selection: $tab com .tag() permite controle programático da aba ativa. .badge() adiciona número de notificações. Com .tabViewStyle(.page) cria paginação horizontal — ótimo para onboarding."],
       code:"struct AppPrincipal: View {\n    @State private var tabAtual = 0\n    \n    var body: some View {\n        TabView(selection: $tabAtual) {\n            HomeView()\n                .tabItem {\n                    Label(\"Início\", systemImage: \"house.fill\")\n                }\n                .tag(0)\n            BuscaView()\n                .tabItem {\n                    Label(\"Buscar\", systemImage: \"magnifyingglass\")\n                }\n                .tag(1)\n                .badge(3)\n            PerfilView()\n                .tabItem {\n                    Label(\"Perfil\", systemImage: \"person.fill\")\n                }\n                .tag(2)\n        }\n    }\n}",
       task:"Monte app completo de 3 abas: Feed (lista de posts com imagem), Explorar (LazyVGrid de categorias), Perfil (stats + lista de conquistas). Badge de notificação no Feed.",
       tip:"Cada aba deve ter seu próprio NavigationStack interno para navegação independente — toque em Perfil não deve afetar a pilha do Feed."},
      {id:15,title:"@Observable e @Environment",concept:"Estado Compartilhado",
       theory:["Para estado compartilhado entre múltiplas views, use a macro @Observable (iOS 17+) com injeção via .environment().","@Observable class MinhaVM { var dados = [] }. Na view raiz: @State private var vm = MinhaVM() e .environment(vm). Nas views filhas: @Environment(MinhaVM.self) var vm. Para iOS 16: use ObservableObject + @Published + @StateObject/@EnvironmentObject."],
       code:"@Observable\nclass CarrinhoViewModel {\n    var items: [String] = []\n    var total: Double = 0\n    \n    func adicionar(_ item: String, preco: Double) {\n        items.append(item)\n        total += preco\n    }\n    func remover(at index: Int) {\n        total -= 59.90\n        items.remove(at: index)\n    }\n}\n\nstruct LojaView: View {\n    @State private var carrinho = CarrinhoViewModel()\n    var body: some View {\n        NavigationStack {\n            ProdutosView().environment(carrinho)\n        }\n    }\n}\n\nstruct ProdutosView: View {\n    @Environment(CarrinhoViewModel.self) var carrinho\n    var body: some View {\n        Button(\"Adicionar Camiseta R$59,90\") {\n            carrinho.adicionar(\"Camiseta\", preco: 59.90)\n        }\n    }\n}",
       task:"Crie app de carrinho de compras: ViewModel com lista de produtos e total. Tela de produtos (adicionar ao carrinho), tela de carrinho (remover items, ver total), badge na aba do carrinho com contagem.",
       tip:"Com @Observable, qualquer propriedade automaticamente dispara re-render quando muda — sem necessidade de @Published como no ObservableObject."},
      {id:16,title:"MVVM na Prática",concept:"Arquitetura MVVM",
       theory:["MVVM (Model-View-ViewModel) é o padrão arquitetural recomendado com SwiftUI. Separa responsabilidades de forma clara e testável.","Model: dados puros (structs imutáveis). ViewModel: lógica de negócio + estado da UI (@Observable class). View: apenas apresentação, reage ao ViewModel via bindings. A View nunca acessa o Model diretamente. O ViewModel não importa SwiftUI."],
       code:"// Model — dado puro\nstruct Artigo: Identifiable {\n    let id: Int\n    let titulo: String\n    let resumo: String\n}\n\n// ViewModel — lógica\n@Observable\nclass ArtigosViewModel {\n    var artigos: [Artigo] = []\n    var isCarregando = false\n    var erro: String?\n    \n    var artigosDestaque: [Artigo] {\n        Array(artigos.prefix(3)) // computed property\n    }\n    \n    func carregar() async {\n        isCarregando = true\n        // chamada de rede aqui\n        isCarregando = false\n    }\n}\n\n// View — só apresentação\nstruct ArtigosView: View {\n    @State private var vm = ArtigosViewModel()\n    var body: some View {\n        Group {\n            if vm.isCarregando { ProgressView() }\n            else { List(vm.artigos) { Text($0.titulo) } }\n        }\n        .task { await vm.carregar() }\n    }\n}",
       task:"Refatore o app de tarefas usando MVVM completo: TarefaModel (struct), TarefaViewModel (@Observable com adicionar/remover/concluir/filtrar), TarefaView (apenas UI sem lógica).",
       tip:"O ViewModel deve ter computed properties como var tarefasConcluidas: [Tarefa] { tarefas.filter { $0.concluida } } que a View acessa diretamente."},
      {id:17,title:"Custom Views e ViewModifiers",concept:"Reutilização de Componentes",
       theory:["Criar componentes reutilizáveis evita repetição e mantém consistência visual no app.","Custom View: struct MeuCard: View com parâmetros no init. Custom ViewModifier: struct CardStyle: ViewModifier { func body(content:) } + extension View { func cardStyle() -> some View { modifier(CardStyle()) } }. Isso permite usar .cardStyle() em qualquer view."],
       code:"struct BadgeView: View {\n    let texto: String\n    let cor: Color\n    var body: some View {\n        Text(texto)\n            .font(.caption.bold())\n            .padding(.horizontal, 8)\n            .padding(.vertical, 4)\n            .background(cor.opacity(0.2))\n            .foregroundColor(cor)\n            .clipShape(Capsule())\n    }\n}\n\nstruct PulsingModifier: ViewModifier {\n    @State private var pulsar = false\n    func body(content: Content) -> some View {\n        content\n            .scaleEffect(pulsar ? 1.06 : 1.0)\n            .animation(.easeInOut(duration: 1).repeatForever(),\n                       value: pulsar)\n            .onAppear { pulsar = true }\n    }\n}\nextension View {\n    func pulsando() -> some View { modifier(PulsingModifier()) }\n}",
       task:"Crie 5 componentes reutilizáveis: StatCard (ícone + valor + label), TagBadge (texto + cor), AvatarView (imagem circular com iniciais como fallback), RatingStars, e LoadingButton (spinner automático enquanto carrega).",
       tip:"Componentes bem projetados têm valores padrão: RatingStars(valor: 4, maximo: 5, cor: .yellow). Use parâmetros com valores default para tornar a API do componente flexível."},
      {id:18,title:"Grid e LazyGrid",concept:"Layouts em Grade",
       theory:["Para layouts em grade, SwiftUI oferece LazyVGrid e LazyHGrid com renderização eficiente (só renderiza o que está visível na tela).","GridItem(.flexible()) se adapta ao espaço disponível. GridItem(.fixed(100)) tem tamanho fixo. GridItem(.adaptive(minimum: 80)) coloca quantas colunas couberem automaticamente. O parâmetro spacing controla o espaço entre itens."],
       code:"struct GaleriaView: View {\n    let colunas = [\n        GridItem(.adaptive(minimum: 100), spacing: 4)\n    ]\n    let emojis = [\"🎨\",\"🎭\",\"🎪\",\"🎢\",\"🎡\",\"🎠\",\n                  \"🏆\",\"🥇\",\"🎯\",\"🎲\",\"🎮\",\"🕹️\"]\n    \n    var body: some View {\n        ScrollView {\n            LazyVGrid(columns: colunas, spacing: 4) {\n                ForEach(emojis, id: \\.self) { emoji in\n                    ZStack {\n                        RoundedRectangle(cornerRadius: 12)\n                            .fill(.blue.opacity(0.1))\n                            .aspectRatio(1, contentMode: .fit)\n                        Text(emoji).font(.largeTitle)\n                    }\n                }\n            }\n            .padding()\n        }\n    }\n}",
       task:"Crie galeria de apps estilo App Store: LazyVGrid de 2 colunas, cada card com ícone colorido (SF Symbol), nome, categoria e botão Obter. Ao tocar, Sheet com detalhes e screenshots simuladas.",
       tip:".aspectRatio(1, contentMode: .fit) em cada card garante que todos tenham a mesma altura proporcional independente do conteúdo interno."},
    ]
  },
  {
    id:4, title:"Persistência e Dados", color:"#F59E0B", icon:"💾",
    exercises:[
      {id:19,title:"UserDefaults e @AppStorage",concept:"Preferências do Usuário",
       theory:["@AppStorage é o wrapper moderno que conecta UserDefaults diretamente à UI com re-render automático ao mudar.","Sintaxe: @AppStorage('chave') var valor = valorPadrao. Tipos suportados: Bool, Int, Double, String, URL, Data. Use para configurações, flags de onboarding, preferências do usuário. NÃO use para dados de negócio (use SwiftData) ou dados sensíveis como senhas (use Keychain)."],
       code:"struct ConfiguracoesView: View {\n    @AppStorage(\"modoEscuro\") private var modoEscuro = false\n    @AppStorage(\"nomeUsuario\") private var nome = \"\"\n    @AppStorage(\"onboardingFeito\") private var onboardingFeito = false\n    \n    var body: some View {\n        Form {\n            Section(\"Perfil\") {\n                TextField(\"Seu nome\", text: $nome)\n            }\n            Section(\"Aparência\") {\n                Toggle(\"Modo Escuro\", isOn: $modoEscuro)\n            }\n            if !onboardingFeito {\n                Button(\"Concluir Tutorial\") {\n                    onboardingFeito = true\n                }\n            }\n        }\n    }\n}",
       task:"Crie sistema de onboarding de 3 telas com .tabViewStyle(.page). Na última tela, botão Começar define @AppStorage('onboardingConcluido') = true. Na raiz do app, verifique a flag para mostrar onboarding ou tela principal.",
       tip:"Na ContentView raiz: @AppStorage('onboardingConcluido') var concluido = false. Depois: if concluido { AppPrincipal() } else { OnboardingView() }."},
      {id:20,title:"SwiftData Básico",concept:"Banco de Dados Local",
       theory:["SwiftData (iOS 17+) é o ORM moderno da Apple — substituto do Core Data com sintaxe Swift nativa e integração automática com SwiftUI.","@Model define a classe persistida automaticamente. @Query(sort:) busca e observa dados reativamente. .modelContainer(for:) na App raiz cria o banco. @Environment(\\.modelContext) dá acesso para insert/delete. Mudanças são persistidas automaticamente."],
       code:"import SwiftData\n\n@Model\nclass Nota {\n    var titulo: String\n    var conteudo: String\n    var criadaEm: Date\n    \n    init(titulo: String, conteudo: String) {\n        self.titulo = titulo\n        self.conteudo = conteudo\n        self.criadaEm = Date()\n    }\n}\n\nstruct NotasView: View {\n    @Environment(\\.modelContext) private var context\n    @Query(sort: \\Nota.criadaEm, order: .reverse) var notas: [Nota]\n    \n    var body: some View {\n        List(notas) { nota in\n            Text(nota.titulo).font(.headline)\n        }\n        .toolbar {\n            Button(\"Nova Nota\") {\n                context.insert(Nota(titulo: \"Nova nota\", conteudo: \"\"))\n            }\n        }\n    }\n}",
       task:"Crie um diário pessoal com SwiftData: entradas com data, humor (Picker de emoji), e texto livre. Lista por data, tela de criação/edição completa, filtro por humor. Persistência total entre sessões.",
       tip:"@Query aceita filtros: @Query(filter: #Predicate<Nota> { $0.humor == humorSelecionado }) para filtrar direto na query do banco de dados."},
      {id:21,title:"Async/Await Básico",concept:"Programação Assíncrona",
       theory:["Swift moderno usa async/await para código assíncrono legível e sem callback hell.","async func declara função que pode pausar sua execução. await aguarda o resultado sem bloquear a thread principal. Task { } cria um contexto assíncrono a partir de código síncrono. .task { } é o modificador da view que inicia automaticamente ao aparecer e cancela ao desaparecer. @MainActor garante execução na thread principal."],
       code:"struct ExemploAsync: View {\n    @State private var mensagem = \"Aguardando...\"\n    @State private var carregando = false\n    \n    var body: some View {\n        VStack(spacing: 20) {\n            if carregando {\n                ProgressView(\"Carregando...\")\n            } else {\n                Text(mensagem)\n                    .multilineTextAlignment(.center)\n                    .padding()\n            }\n            Button(\"Buscar Dados\") {\n                Task { await buscar() }\n            }\n            .buttonStyle(.borderedProminent)\n        }\n        .task { await buscar() }\n    }\n    \n    func buscar() async {\n        carregando = true\n        try? await Task.sleep(nanoseconds: 1_500_000_000) // simula rede\n        mensagem = \"Dados carregados com sucesso!\"\n        carregando = false\n    }\n}",
       task:"Crie timer Pomodoro assíncrono: 25min foco, 5min pausa. Use Task com loop e Task.sleep de 1s para cada tick, exiba MM:SS no display, barra de progresso circular, e som via AudioServicesPlaySystemSound ao finalizar.",
       tip:"Use for await em um AsyncStream ou um loop simples: while segunos > 0 { try await Task.sleep(nanoseconds: 1_000_000_000); segundos -= 1 }. Cancele a Task ao pausar."},
      {id:22,title:"JSON e Codable",concept:"Serialização de Dados",
       theory:["Codable = Encodable + Decodable. Converte automaticamente entre structs Swift e JSON com praticamente zero código.","JSONDecoder().decode(Tipo.self, from: data) para decodificar. decoder.keyDecodingStrategy = .convertFromSnakeCase converte first_name para firstName automaticamente. Campos opcionais com ? aceitam null do JSON. JSONEncoder() para converter struct em JSON para enviar à API."],
       code:"// JSON recebido: {\"id\":1,\"first_name\":\"João\",\"avatar\":null}\n\nstruct Usuario: Codable {\n    let id: Int\n    let firstName: String  // auto-mapeado de first_name\n    let avatar: String?    // aceita null do JSON\n}\n\nfunc decodificar() throws -> Usuario {\n    let json = \"\"\"\n    {\"id\": 1, \"first_name\": \"João\", \"avatar\": null}\n    \"\"\".data(using: .utf8)!\n    \n    let decoder = JSONDecoder()\n    decoder.keyDecodingStrategy = .convertFromSnakeCase\n    \n    return try decoder.decode(Usuario.self, from: json)\n}\n\n// Codificar para enviar\nfunc codificar(usuario: Usuario) throws -> Data {\n    return try JSONEncoder().encode(usuario)\n}",
       task:"Crie modelos Codable para resposta de API de filmes: título, ano, nota, poster_url, array de generos, objeto de diretor aninhado. Faça parsing de JSON local hardcoded e exiba em card com todos os dados.",
       tip:"Para datas ISO 8601: decoder.dateDecodingStrategy = .iso8601. Para arrays: let generos: [String]. Para objetos aninhados: let diretor: Diretor (onde Diretor também é Codable)."},
    ]
  },
  {
    id:5, title:"Networking e APIs", color:"#10B981", icon:"🌐",
    exercises:[
      {id:23,title:"URLSession Básico",concept:"Requisições HTTP",
       theory:["URLSession é a API nativa do iOS para requisições de rede. Com async/await fica muito legível.","Fluxo completo: (1) Criar URL com URL(string:), (2) let (data, response) = try await URLSession.shared.data(from: url), (3) verificar statusCode 200-299, (4) JSONDecoder().decode(). Sempre envolva em do/catch para tratar erros de rede e de parsing."],
       code:"struct Post: Codable, Identifiable {\n    let id: Int\n    let title: String\n    let body: String\n    let userId: Int\n}\n\n@Observable\nclass PostsViewModel {\n    var posts: [Post] = []\n    var isCarregando = false\n    var erro: String?\n    \n    func buscarPosts() async {\n        isCarregando = true\n        erro = nil\n        do {\n            let url = URL(string: \"https://jsonplaceholder.typicode.com/posts\")!\n            let (data, _) = try await URLSession.shared.data(from: url)\n            let decoder = JSONDecoder()\n            decoder.keyDecodingStrategy = .convertFromSnakeCase\n            posts = try decoder.decode([Post].self, from: data)\n        } catch {\n            erro = error.localizedDescription\n        }\n        isCarregando = false\n    }\n}",
       task:"Conecte ao JSONPlaceholder (jsonplaceholder.typicode.com): liste posts, ao tocar veja detalhes + comentários (2a requisição para /posts/{id}/comments), e dados do autor (3a para /users/{userId}). Trate loading e erros.",
       tip:"JSONPlaceholder é gratuito e sem autenticação. Endpoints disponíveis: /posts, /posts/1/comments, /users/1. Perfeito para praticar networking."},
      {id:24,title:"Service Layer",concept:"Camada de Serviço",
       theory:["Para apps reais, separe a lógica de rede em uma classe Service dedicada. Isso centraliza configurações e facilita testes.","Padrão recomendado: protocol APIServiceProtocol { func buscarPosts() async throws -> [Post] }. Implemente APIService (real) e MockAPIService (retorna dados fake para Previews e testes). O ViewModel recebe o serviço via injeção de dependência."],
       code:"// Cliente HTTP genérico e reutilizável\nstruct HTTPClient {\n    static let shared = HTTPClient()\n    private let baseURL = \"https://jsonplaceholder.typicode.com\"\n    private let decoder: JSONDecoder = {\n        let d = JSONDecoder()\n        d.keyDecodingStrategy = .convertFromSnakeCase\n        return d\n    }()\n    \n    func get<T: Decodable>(_ endpoint: String) async throws -> T {\n        guard let url = URL(string: baseURL + endpoint)\n        else { throw URLError(.badURL) }\n        \n        let (data, response) = try await URLSession.shared.data(from: url)\n        \n        guard let http = response as? HTTPURLResponse,\n              200...299 ~= http.statusCode\n        else { throw URLError(.badServerResponse) }\n        \n        return try decoder.decode(T.self, from: data)\n    }\n}\n// Uso: let posts: [Post] = try await HTTPClient.shared.get(\"/posts\")",
       task:"Crie HTTPClient com GET, POST, PUT, DELETE. Implemente PostService usando-o. Crie MockPostService para Previews. Demonstre as 4 operações numa view com indicadores visuais de cada ação.",
       tip:"Para POST/PUT: crie URLRequest, defina request.httpMethod = 'POST', request.setValue('application/json', forHTTPHeaderField: 'Content-Type') e request.httpBody = try JSONEncoder().encode(body)."},
      {id:25,title:"Tratamento de Erros de Rede",concept:"Error Handling",
       theory:["Apps robustos tratam todos os cenários de falha para não deixar o usuário preso numa tela em branco.","Crie enum AppError: LocalizedError com casos específicos. Padrão LoadState<T>: enum com idle, loading, success(T), failure(AppError). Crie uma view genérica AsyncStateView que recebe o estado e renderiza automaticamente o loading, erro com botão retry, ou o conteúdo."],
       code:"enum AppError: LocalizedError {\n    case semConexao, servidorIndisponivel\n    case naoAutorizado, dadosInvalidos\n    \n    var errorDescription: String? {\n        switch self {\n        case .semConexao: return \"Sem conexão com a internet\"\n        case .servidorIndisponivel: return \"Serviço indisponível. Tente mais tarde.\"\n        case .naoAutorizado: return \"Sessão expirada. Faça login novamente.\"\n        case .dadosInvalidos: return \"Erro inesperado nos dados recebidos.\"\n        }\n    }\n}\n\nenum LoadState<T> {\n    case idle, loading\n    case success(T)\n    case failure(AppError)\n}",
       task:"Refatore o app de posts com LoadState. Crie view genérica AsyncContent<T> que exibe loading skeleton, erro com retry, empty state, ou conteúdo. Simule erros diferentes via um Picker de debug.",
       tip:"Use URLSessionConfiguration.default com timeoutIntervalForRequest = 3 para testar timeout rápido. Network Link Conditioner no simulador simula conexões lentas."},
      {id:26,title:"AsyncImage para Imagens Remotas",concept:"AsyncImage",
       theory:["AsyncImage carrega imagens de URLs remotas de forma assíncrona com suporte nativo a loading, sucesso e erro.","Use a versão com phase para controle total: .empty (ainda carregando), .success(image) com a imagem pronta, .failure para mostrar placeholder de erro. Combine .resizable().scaledToFill().clipped() para imagens que preenchem corretamente o frame definido."],
       code:"struct CardFilme: View {\n    let posterURL: String\n    let titulo: String\n    let nota: Double\n    \n    var body: some View {\n        VStack(alignment: .leading) {\n            AsyncImage(url: URL(string: posterURL)) { fase in\n                switch fase {\n                case .success(let img):\n                    img.resizable()\n                        .scaledToFill()\n                        .frame(height: 200)\n                        .clipped()\n                case .failure:\n                    Rectangle().fill(.gray.opacity(0.15))\n                        .frame(height: 200)\n                        .overlay(\n                            Image(systemName: \"photo\")\n                                .font(.largeTitle).foregroundColor(.gray)\n                        )\n                default:\n                    Rectangle().fill(.gray.opacity(0.08))\n                        .frame(height: 200).overlay(ProgressView())\n                }\n            }\n            .cornerRadius(12)\n            Text(titulo).font(.headline).lineLimit(1)\n        }\n    }\n}",
       task:"Crie browser de fotos com picsum.photos: LazyVGrid com AsyncImage, tela de detalhe ao tocar com imagem full-screen, botão compartilhar nativo usando ShareLink.",
       tip:"picsum.photos/400/600 retorna imagem aleatória. picsum.photos/id/{1..1000}/400/600 para imagem específica por ID. ShareLink(item: url) cria botão de compartilhamento nativo automaticamente."},
      {id:27,title:"CRUD Completo com REST",concept:"CRUD via HTTP",
       theory:["Implementando todas as operações CRUD (Create, Read, Update, Delete) com uma API REST real.","Verbos HTTP: GET (listar/buscar), POST (criar — retorna 201), PUT (substituir completo), PATCH (atualizar parcial), DELETE (remover — retorna 204). Headers essenciais: Content-Type: application/json para enviar corpo JSON. Authorization: Bearer {token} para APIs autenticadas."],
       code:"struct PostService {\n    static let shared = PostService()\n    private let base = \"https://jsonplaceholder.typicode.com\"\n    \n    func criar(titulo: String, corpo: String) async throws -> Post {\n        var req = URLRequest(url: URL(string: \"\\(base)/posts\")!)\n        req.httpMethod = \"POST\"\n        req.setValue(\"application/json\", forHTTPHeaderField: \"Content-Type\")\n        let body = [\"title\": titulo, \"body\": corpo, \"userId\": \"1\"]\n        req.httpBody = try JSONEncoder().encode(body)\n        let (data, _) = try await URLSession.shared.data(for: req)\n        return try JSONDecoder().decode(Post.self, from: data)\n    }\n    \n    func deletar(id: Int) async throws {\n        var req = URLRequest(url: URL(string: \"\\(base)/posts/\\(id)\")!)\n        req.httpMethod = \"DELETE\"\n        _ = try await URLSession.shared.data(for: req)\n    }\n}",
       task:"Implemente CRUD completo de posts: listar, criar (Sheet com form), editar (Sheet pré-preenchido), deletar (Alert de confirmação). Simule persistência local atualizando @State após cada operação da API.",
       tip:"JSONPlaceholder aceita POST/PUT/DELETE mas não persiste os dados. Atualize o array local otimisticamente após confirmar a requisição para UX responsiva."},
      {id:28,title:"Busca com Debounce",concept:"Searchable e Debounce",
       theory:["SwiftUI tem suporte nativo a buscas com .searchable(text: $termo). O debounce evita uma requisição por tecla digitada.","Implemente debounce cancelando e recriando a Task a cada mudança: taskAtual?.cancel(); taskAtual = Task { try? await Task.sleep(nanoseconds: 500_000_000); guard !Task.isCancelled else { return }; /* chamar API */ }. Isso aguarda 500ms de inatividade antes de buscar."],
       code:"@Observable\nclass BuscaViewModel {\n    var termoBusca = \"\"\n    var resultados: [Post] = []\n    var isCarregando = false\n    private var taskAtual: Task<Void, Never>?\n    \n    func buscar() {\n        taskAtual?.cancel()\n        guard !termoBusca.isEmpty else {\n            resultados = []\n            return\n        }\n        taskAtual = Task {\n            try? await Task.sleep(nanoseconds: 500_000_000)\n            guard !Task.isCancelled else { return }\n            isCarregando = true\n            let url = URL(string: \"https://jsonplaceholder.typicode.com/posts\")!\n            let (data, _) = try! await URLSession.shared.data(from: url)\n            let todos = try! JSONDecoder().decode([Post].self, from: data)\n            resultados = todos.filter {\n                $0.title.localizedCaseInsensitiveContains(termoBusca)\n            }\n            isCarregando = false\n        }\n    }\n}",
       task:"Crie app de busca de livros com Open Library API (openlibrary.org/search.json?q=). Barra de busca com debounce de 500ms, grid com capa (AsyncImage) + título + autor. Filtros por idioma e tipo.",
       tip:"Open Library: https://openlibrary.org/search.json?q=harry+potter&limit=20. Capa: https://covers.openlibrary.org/b/id/{cover_i}-M.jpg. API gratuita sem autenticação."},
      {id:29,title:"Autenticação com Token",concept:"Auth + JWT",
       theory:["A maioria das APIs reais requer autenticação. O padrão mais comum é JWT (JSON Web Token) via Authorization header.","Fluxo: (1) POST /login com credenciais, (2) Receber { token }, (3) Salvar o token, (4) Incluir em toda requisição: request.setValue('Bearer {token}', forHTTPHeaderField: 'Authorization'), (5) Tratar resposta 401 redirecionando para login. Use @AppStorage para protótipos e Keychain para produção."],
       code:"@Observable\nclass AuthViewModel {\n    @AppStorage(\"authToken\") var token: String = \"\"\n    var estaLogado: Bool { !token.isEmpty }\n    var erroLogin: String?\n    \n    func login(email: String, senha: String) async {\n        erroLogin = nil\n        do {\n            var req = URLRequest(url: URL(string: \"https://reqres.in/api/login\")!)\n            req.httpMethod = \"POST\"\n            req.setValue(\"application/json\", forHTTPHeaderField: \"Content-Type\")\n            let body = [\"email\": email, \"password\": senha]\n            req.httpBody = try JSONEncoder().encode(body)\n            let (data, _) = try await URLSession.shared.data(for: req)\n            let resp = try JSONDecoder().decode(LoginResponse.self, from: data)\n            token = resp.token\n        } catch {\n            erroLogin = \"Credenciais inválidas. Tente novamente.\"\n        }\n    }\n    \n    func logout() { token = \"\" }\n}\n\nstruct LoginResponse: Codable { let token: String }",
       task:"Crie fluxo completo de autenticação com reqres.in: tela de login, salvar token, tela principal só acessível logado, botão de logout, tratamento de credenciais inválidas com mensagem de erro.",
       tip:"reqres.in: email 'eve.holt@reqres.in', senha 'cityslicka' para login bem-sucedido. Email inválido retorna 400. Use .environment(authVM) na raiz para acessar em toda a hierarquia da app."},
      {id:30,title:"Projeto Final: Movie Browser",concept:"App Completo Integrador",
       theory:["Este exercício integra TODOS os 29 conceitos anteriores em um app completo, funcional e bem arquitetado.","Tecnologias integradas: Views e layouts avançados, MVVM com @Observable, NavigationStack + TabView, URLSession + async/await, Codable + JSON, AsyncImage, Searchable com debounce, @AppStorage para favoritos, Error handling completo com estados de loading/erro/empty, Custom components reutilizáveis. API sugerida: OMDb API (omdbapi.com) — gratuita com cadastro simples."],
       code:"// Estrutura de arquivos do projeto final:\n\n// Models/\n//   Movie.swift              ← struct Codable completa\n//   SearchResponse.swift     ← wrapper da resposta paginada\n\n// Services/\n//   MovieService.swift       ← protocol + implementação real\n//   MockMovieService.swift   ← dados fake para Preview\n\n// ViewModels/\n//   SearchViewModel.swift    ← busca, debounce, paginação\n//   DetailViewModel.swift    ← detalhe + ação favoritar\n//   FavoritesViewModel.swift ← lista persistida de favoritos\n\n// Views/\n//   ContentView.swift        ← TabView raiz (3 abas)\n//   SearchView.swift         ← busca + grid de resultados\n//   MovieCard.swift          ← componente reutilizável\n//   MovieDetailView.swift    ← todos os dados + AsyncImage\n//   FavoritesView.swift      ← favoritos persistidos\n//   LoadingView.swift        ← skeleton de loading\n//   ErrorView.swift          ← erro com retry genérico",
       task:"PROJETO FINAL: Movie Browser completo. Features obrigatórias: (1) busca de filmes com debounce via OMDb API, (2) grid LazyVGrid com poster AsyncImage + título + ano, (3) tela de detalhe com todos os metadados, (4) favoritos persistidos com @AppStorage, (5) aba de favoritos, (6) estados completos: loading skeleton, erro com retry, empty state, (7) mínimo 5 custom components reutilizáveis.",
       tip:"Chave gratuita em omdbapi.com (cadastro com email). Busca: https://www.omdbapi.com/?s={query}&apikey={key}. Detalhe: ?i={imdbID}&apikey={key}. Poster incluso na resposta como campo Poster."},
    ]
  },
];

export default function SwiftuiPlanoEstudos() {
  const [moduleIdx, setModuleIdx] = useState(0);
  const [activeEx, setActiveEx] = useState(null);
  const [done, setDone] = useState(new Set());

  const allEx = MODULES.flatMap(m => m.exercises);
  const progress = Math.round((done.size / allEx.length) * 100);

  function toggleDone(id) {
    setDone(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  }

  const exIdx = activeEx ? allEx.findIndex(e => e.id === activeEx.id) : -1;
  const prevEx = exIdx > 0 ? allEx[exIdx - 1] : null;
  const nextEx = exIdx < allEx.length - 1 ? allEx[exIdx + 1] : null;
  const exMod = activeEx ? MODULES.find(m => m.exercises.some(e => e.id === activeEx.id)) : null;

  const S = {
    page: { minHeight:"100vh", background:"#0d0d14", color:"#e0e0f0", fontFamily:"system-ui,sans-serif" },
    header: { background:"#13131f", borderBottom:"1px solid #ffffff10", padding:"13px 18px", display:"flex", alignItems:"center", gap:"12px", position:"sticky", top:0, zIndex:10 },
    backBtn: { background:"#ffffff15", border:"none", borderRadius:"8px", color:"#e0e0f0", padding:"7px 12px", cursor:"pointer", fontSize:"13px" },
    hero: { background:"linear-gradient(150deg,#1a0a2e,#0d0d14 55%)", borderBottom:"1px solid #ffffff08", padding:"36px 20px 32px", textAlign:"center" },
    pill: { display:"inline-block", background:"#7c3aed20", border:"1px solid #7c3aed40", borderRadius:"20px", padding:"5px 14px", marginBottom:"16px" },
    h1: { fontSize:"clamp(24px,5vw,42px)", fontWeight:800, margin:"0 0 10px", background:"linear-gradient(135deg,#fff,#a78bfa)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", letterSpacing:"-0.02em" },
    progressBox: { maxWidth:"340px", margin:"0 auto", background:"#13131f", border:"1px solid #ffffff0a", borderRadius:"12px", padding:"16px 20px" },
    tabs: { background:"#0d0d14", borderBottom:"1px solid #ffffff08", display:"flex", overflowX:"auto", padding:"0 18px", gap:"2px", position:"sticky", top:0, zIndex:10 },
    grid: { maxWidth:"1060px", margin:"0 auto", padding:"24px 18px", display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))", gap:"12px" },
    card: { borderRadius:"13px", padding:"18px", cursor:"pointer", transition:"all 0.18s", position:"relative" },
    sectionLabel: { fontSize:"11px", fontWeight:700, color:"#666", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"10px" },
    theoryBox: { background:"#13131f", border:"1px solid #ffffff0a", borderRadius:"13px", padding:"18px" },
    codeWrap: { background:"#0a0e1a", borderRadius:"13px", overflow:"hidden" },
    codeBar: { padding:"8px 14px", display:"flex", gap:"5px", alignItems:"center" },
    pre: { margin:0, padding:"18px", fontSize:"12px", lineHeight:"1.7", fontFamily:"'Fira Code','SF Mono',monospace", color:"#7ecb87", overflowX:"auto", whiteSpace:"pre-wrap", wordBreak:"break-word" },
    taskBox: { borderRadius:"13px", padding:"18px" },
    tipBox: { background:"#13131f", border:"1px solid #2a2a3a", borderRadius:"11px", padding:"13px 16px", display:"flex", gap:"10px" },
    navBtns: { display:"flex", gap:"10px" },
  };

  if (activeEx && exMod) {
    const isDone = done.has(activeEx.id);
    return (
      <div style={S.page}>
        <div style={S.header}>
          <button onClick={() => setActiveEx(null)} style={S.backBtn}>← Voltar</button>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:"11px", color:exMod.color, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase" }}>
              {exMod.icon} {exMod.title} · #{activeEx.id}/30
            </div>
            <div style={{ fontSize:"17px", fontWeight:700 }}>{activeEx.title}</div>
          </div>
          <button onClick={() => toggleDone(activeEx.id)} style={{ background:isDone?exMod.color:"transparent", border:`2px solid ${exMod.color}`, borderRadius:"8px", color:isDone?"#000":exMod.color, padding:"7px 14px", cursor:"pointer", fontWeight:700, fontSize:"12px" }}>
            {isDone ? "✓ Feito" : "Marcar feito"}
          </button>
        </div>
        <div style={{ maxWidth:"800px", margin:"0 auto", padding:"26px 18px" }}>
          <div style={{ display:"inline-block", background:`${exMod.color}18`, border:`1px solid ${exMod.color}40`, borderRadius:"20px", padding:"5px 14px", marginBottom:"22px" }}>
            <span style={{ fontSize:"12px", color:exMod.color, fontWeight:600 }}>📌 {activeEx.concept}</span>
          </div>
          <section style={{ marginBottom:"22px" }}>
            <div style={S.sectionLabel}>Teoria</div>
            <div style={S.theoryBox}>
              {activeEx.theory.map((p,i) => (
                <p key={i} style={{ margin:i===0?"0 0 10px":"10px 0 0", fontSize:"14px", lineHeight:"1.75", color:"#bbbbd0" }}>{p}</p>
              ))}
            </div>
          </section>
          <section style={{ marginBottom:"22px" }}>
            <div style={S.sectionLabel}>Exemplo de Código</div>
            <div style={{ ...S.codeWrap, border:`1px solid ${exMod.color}30` }}>
              <div style={{ ...S.codeBar, background:`${exMod.color}18` }}>
                {["#ff5f57","#ffbd2e","#28ca41"].map(c => <div key={c} style={{ width:9,height:9,borderRadius:"50%",background:c }} />)}
                <span style={{ marginLeft:"8px", fontSize:"11px", color:"#666", fontFamily:"monospace" }}>Swift · SwiftUI</span>
              </div>
              <pre style={S.pre}>{activeEx.code}</pre>
            </div>
          </section>
          <section style={{ marginBottom:"18px" }}>
            <div style={S.sectionLabel}>🎯 Sua Tarefa</div>
            <div style={{ ...S.taskBox, background:`${exMod.color}10`, border:`1px solid ${exMod.color}35` }}>
              <p style={{ margin:0, fontSize:"14px", lineHeight:"1.75", color:"#ddd" }}>{activeEx.task}</p>
            </div>
          </section>
          <div style={{ ...S.tipBox, marginBottom:"28px" }}>
            <span style={{ fontSize:"18px" }}>💡</span>
            <div>
              <div style={{ fontSize:"11px", fontWeight:700, color:"#555", marginBottom:"3px", textTransform:"uppercase", letterSpacing:"0.05em" }}>Dica</div>
              <p style={{ margin:0, fontSize:"13px", lineHeight:"1.65", color:"#888" }}>{activeEx.tip}</p>
            </div>
          </div>
          <div style={S.navBtns}>
            <button onClick={() => prevEx && setActiveEx(prevEx)} disabled={!prevEx}
              style={{ flex:1, background:prevEx?"#13131f":"transparent", border:"1px solid #1e1e30", borderRadius:"10px", color:prevEx?"#e0e0f0":"#333", padding:"12px 14px", cursor:prevEx?"pointer":"not-allowed", fontSize:"13px", textAlign:"left" }}>
              {prevEx && `← #${prevEx.id} ${prevEx.title}`}
            </button>
            <button onClick={() => nextEx && setActiveEx(nextEx)} disabled={!nextEx}
              style={{ flex:1, background:nextEx?`${exMod.color}18`:"transparent", border:`1px solid ${nextEx?exMod.color+"40":"#1e1e30"}`, borderRadius:"10px", color:nextEx?"#e0e0f0":"#333", padding:"12px 14px", cursor:nextEx?"pointer":"not-allowed", fontSize:"13px", textAlign:"right" }}>
              {nextEx && `#${nextEx.id} ${nextEx.title} →`}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const mod = MODULES[moduleIdx];
  return (
    <div style={S.page}>
      <div style={S.hero}>
        <div style={S.pill}>
          <span style={{ fontSize:"11px", color:"#a78bfa", fontWeight:700, letterSpacing:"0.08em" }}>TRILHA DE ESTUDOS · 30 EXERCÍCIOS</span>
        </div>
        <h1 style={S.h1}>SwiftUI para iOS</h1>
        <p style={{ color:"#666", fontSize:"15px", margin:"0 0 24px" }}>Do zero à requisição de rede — 30 exercícios progressivos</p>
        <div style={S.progressBox}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"7px" }}>
            <span style={{ fontSize:"13px", color:"#666" }}>Progresso geral</span>
            <span style={{ fontSize:"13px", fontWeight:700, color:"#a78bfa" }}>{done.size}/30</span>
          </div>
          <div style={{ background:"#1a1a2a", borderRadius:"6px", height:"6px", overflow:"hidden" }}>
            <div style={{ height:"100%", width:`${progress}%`, background:"linear-gradient(90deg,#7c3aed,#a78bfa)", borderRadius:"6px", transition:"width 0.4s" }} />
          </div>
          <div style={{ fontSize:"11px", color:"#444", marginTop:"5px", textAlign:"right" }}>{progress}% completo</div>
        </div>
      </div>

      <div style={S.tabs}>
        {MODULES.map((m, idx) => {
          const mDone = m.exercises.filter(e => done.has(e.id)).length;
          const active = moduleIdx === idx;
          return (
            <button key={m.id} onClick={() => setModuleIdx(idx)}
              style={{ background:active?`${m.color}18`:"transparent", border:"none", borderBottom:active?`2px solid ${m.color}`:"2px solid transparent", color:active?m.color:"#555", padding:"13px 16px", cursor:"pointer", fontSize:"13px", fontWeight:active?700:500, whiteSpace:"nowrap", display:"flex", alignItems:"center", gap:"6px", transition:"all 0.2s" }}>
              <span>{m.icon}</span>
              <span style={{ display:"none", ["@media(min-width:500px)"]:"block" }}>{m.title}</span>
              <span style={{ background:mDone===m.exercises.length?m.color:"#1e1e30", color:mDone===m.exercises.length?"#000":"#555", borderRadius:"7px", padding:"1px 6px", fontSize:"11px", fontWeight:700 }}>{mDone}/{m.exercises.length}</span>
            </button>
          );
        })}
      </div>

      <div style={{ maxWidth:"1060px", margin:"0 auto", padding:"22px 18px" }}>
        <div style={{ marginBottom:"18px" }}>
          <h2 style={{ fontSize:"21px", fontWeight:800, color:mod.color, margin:"0 0 5px" }}>{mod.icon} {mod.title}</h2>
          <p style={{ color:"#555", fontSize:"13px", margin:0 }}>{mod.exercises.length} exercícios — clique para abrir teoria, código e tarefa</p>
        </div>
        <div style={S.grid}>
          {mod.exercises.map(ex => {
            const isDone = done.has(ex.id);
            return (
              <div key={ex.id} onClick={() => setActiveEx(ex)}
                style={{ ...S.card, background:isDone?`${mod.color}0e`:"#13131f", border:`1px solid ${isDone?mod.color+"40":"#ffffff08"}` }}
                onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow=`0 6px 20px ${mod.color}12`; }}
                onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}>
                {isDone && (
                  <div style={{ position:"absolute", top:13, right:13, background:mod.color, borderRadius:"50%", width:21, height:21, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"11px", fontWeight:700, color:"#000" }}>✓</div>
                )}
                <div style={{ display:"flex", alignItems:"flex-start", gap:"10px", marginBottom:"10px" }}>
                  <div style={{ background:`${mod.color}22`, color:mod.color, borderRadius:"8px", width:34, height:34, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"13px", fontWeight:800, flexShrink:0 }}>{ex.id}</div>
                  <div>
                    <div style={{ fontSize:"15px", fontWeight:700, color:isDone?mod.color:"#e0e0f0", marginBottom:"3px" }}>{ex.title}</div>
                    <div style={{ fontSize:"11px", color:"#555", background:"#ffffff08", borderRadius:"5px", padding:"2px 7px", display:"inline-block" }}>{ex.concept}</div>
                  </div>
                </div>
                <p style={{ margin:"0 0 12px", fontSize:"12px", color:"#555", lineHeight:"1.6", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{ex.task}</p>
                <span style={{ fontSize:"12px", color:mod.color, fontWeight:600 }}>Ver exercício →</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
