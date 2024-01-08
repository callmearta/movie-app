import { View } from "react-native";

type Props = {
  children: React.ReactNode;
};

export default function MovieBody({ children }: Props) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        paddingLeft: 0,
        paddingVertical:12,
        flexWrap:'wrap',
        flex:1,
        width:'100%',
        paddingRight:12
      }}
    >
      {children}
    </View>
  );
}
