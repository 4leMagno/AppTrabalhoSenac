import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import { createTable } from './databaseFunctions'; // Importe aqui a função createTable

const icons = {
  Estoque: 'storage',
  Financeiro: 'attach-money',
  Loja: 'store',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 80,
    alignItems: 'center',
  },
  title: {
    color: '#121212',
    fontSize: 24,
    paddingBottom: 20,
    fontWeight: 'bold',
  },
  listItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  itemDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 16,
    color: '#007bff',
    marginRight: 8,
  },
  itemQuantity: {
    fontSize: 16,
    color: '#28a745',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    width: '80%',
    height: 40,
    backgroundColor: '#007bff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  menuButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Alterado para espaçamento entre os botões
    width: '80%', // Ajustado para evitar que os botões fiquem muito próximos das bordas
    marginTop: 20,
  },
  menuButton: {
    width: '30%',
    height: 100,
    backgroundColor: '#007bff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
});

function LoginScreen({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  //const [username, setUsername] = React.useState('');

  const handleLogin = () => {
    navigation.navigate('Menu');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

function MenuScreen({ navigation }) {
  const handleLogout = () => {
    navigation.navigate('Login');
  };

  const handleNavigateToStock = () => {
    navigation.navigate('Estoque');
  };

  const handleNavigateToFinance = () => {
    navigation.navigate('Finance');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      <View style={styles.menuButtonContainer}>
        <TouchableOpacity style={styles.menuButton} onPress={handleNavigateToStock}>
          <MaterialIcons name={icons['Estoque']} size={32} color="#fff" />
          <Text style={styles.buttonText}>Estoque</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={handleNavigateToFinance}>
          <MaterialIcons name={icons['Financeiro']} size={32} color="#fff" />
          <Text style={styles.buttonText}>Financeiro</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.menuButton, { backgroundColor: '#ff0000' }]} onPress={handleLogout}>
          <Text style={styles.buttonText}>SAIR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function StockScreen() {
  const data = [
    { id: '1', name: 'Cerveja Legal 450ml', price: 'R$ 7,50', quantity: 10 },
    { id: '2', name: 'Cola Cola 350ml', price: 'R$ 3,00', quantity: 15 },
    { id: '3', name: 'Cerveja boa 600ml', price: 'R$ 8,00', quantity: 5 },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.itemName}>{item.name}</Text>
      <View style={styles.itemDetails}>
        <Text style={styles.itemPrice}>{item.price}</Text>
        <Text style={styles.itemQuantity}>{item.quantity} unidades</Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { alignItems: 'flex-start' }]}>
      <Text style={styles.title}>Estoque</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={{ width: '100%' }}
      />
    </View>
  );
}

function FinanceScreen({ navigation }) {
  const [expenses, setExpenses] = React.useState([]);
  const [isAddingExpense, setIsAddingExpense] = React.useState(false);
  const [expenseName, setExpenseName] = React.useState('');
  const [expenseAmount, setExpenseAmount] = React.useState('');

  const handleAddExpense = () => {
    const newExpense = { id: expenses.length + 1, name: expenseName, amount: expenseAmount };
    setExpenses([...expenses, newExpense]);
    setIsAddingExpense(false);
    setExpenseName('');
    setExpenseAmount('');
  };

  const handleDeleteExpense = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Financeiro</Text>
      <FlatList
        data={expenses}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item.name} - {item.amount}</Text>
            <TouchableOpacity onPress={() => handleDeleteExpense(item.id)}>
              <Text>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        style={{ width: '100%' }}
      />
      {isAddingExpense ? (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Nome da despesa"
            value={expenseName}
            onChangeText={setExpenseName}
          />
          <TextInput
            style={styles.input}
            placeholder="Valor da despesa"
            value={expenseAmount}
            onChangeText={setExpenseAmount}
          />
          <TouchableOpacity style={styles.button} onPress={handleAddExpense}>
            <Text style={styles.buttonText}>Adicionar Despesa</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.button} onPress={() => setIsAddingExpense(true)}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

function AddExpenseScreen({ navigation }) {
  // Se precisar de uma tela separada para adicionar despesas, pode implementar aqui
}

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    createTable();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Estoque" component={StockScreen} />
        <Stack.Screen name="Finance" component={FinanceScreen} />
        <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
