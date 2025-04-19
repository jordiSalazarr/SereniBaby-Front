// "use client"
// import { FaMoon, FaSun, FaBed } from "react-icons/fa";
// import { format, parseISO } from "date-fns";

// type SleepRecord = {
//   id: string;
//   date: string;
//   sleepTime?: string;
//   wakeTime?: string;
//   wakeups?: number;
//   isSleepHour?: boolean;
//   notes?: string;
// };

// type NapOrWakeRecord = {
//   id: string;
//   date: string;
//   startTime: string;
//   endTime: string;
//   notes?: string;
// };

// type Props = {
//   sleepRecords: SleepRecord[];
//   napRecords: NapOrWakeRecord[];
// };

// const SleepLog: React.FC<Props> = ({ sleepRecords, napRecords }) => {
//   const groupedByDate: Record<string, { sleep: SleepRecord[]; naps: NapOrWakeRecord[] }> = {};

//   // Agrupar por fecha
//   sleepRecords.forEach((rec) => {
//     if (!groupedByDate[rec.date]) groupedByDate[rec.date] = { sleep: [], naps: [] };
//     groupedByDate[rec.date].sleep.push(rec);
//   });

//   napRecords.forEach((rec) => {
//     if (!groupedByDate[rec.date]) groupedByDate[rec.date] = { sleep: [], naps: [] };
//     groupedByDate[rec.date].naps.push(rec);
//   });

//   const sortedDates = Object.keys(groupedByDate).sort((a, b) => b.localeCompare(a));

//   return (
//     <VStack align="stretch" spacing={6} p={4}>
//       <Heading size="lg" mb={2}>
//         Registro de Sueño de Carlitos
//       </Heading>
//       {sortedDates.map((date) => {
//         const day = groupedByDate[date];
//         return (
//           <Box key={date} borderWidth="1px" borderRadius="xl" p={4} shadow="md">
//             <Heading size="md" mb={2}>
//               {format(parseISO(date), "PPP")}
//             </Heading>

//             <VStack align="stretch" spacing={3}>
//               {day.sleep.map((rec) => (
//                 <HStack
//                   key={rec.id}
//                   p={3}
//                   borderRadius="lg"
//                   bg="blue.50"
//                   spacing={4}
//                   align="start"
//                 >
//                   <Icon
//                     as={rec.sleepTime ? FaMoon : FaSun}
//                     boxSize={5}
//                     color="blue.500"
//                     mt={1}
//                   />
//                   <Box>
//                     <Text fontWeight="bold">
//                       {rec.sleepTime
//                         ? `Durmió a las ${rec.sleepTime}`
//                         : `Se despertó a las ${rec.wakeTime}`}
//                     </Text>
//                     {rec.wakeups !== undefined && (
//                       <Badge colorScheme={rec.wakeups > 0 ? "red" : "green"} mt={1}>
//                         {rec.wakeups} despertares
//                       </Badge>
//                     )}
//                     {rec.notes && (
//                       <Text fontSize="sm" color="gray.600" mt={1}>
//                         Nota: {rec.notes}
//                       </Text>
//                     )}
//                   </Box>
//                 </HStack>
//               ))}

//               {day.naps.map((nap) => (
//                 <HStack
//                   key={nap.id}
//                   p={3}
//                   borderRadius="lg"
//                   bg="orange.50"
//                   spacing={4}
//                   align="start"
//                 >
//                   <Icon as={FaBed} boxSize={5} color="orange.400" mt={1} />
//                   <Box>
//                     <Text fontWeight="bold">
//                       Siesta de {nap.startTime} a {nap.endTime}
//                     </Text>
//                     {nap.notes && (
//                       <Text fontSize="sm" color="gray.600" mt={1}>
//                         Nota: {nap.notes}
//                       </Text>
//                     )}
//                   </Box>
//                 </HStack>
//               ))}
//             </VStack>
//           </Box>
//         );
//       })}
//     </VStack>
//   );
// };

// export default SleepLog;
